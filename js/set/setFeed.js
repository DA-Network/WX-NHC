/* js/set/setFeed.js
* gets feed from NWS and saves it 
*
* WRITTEN BY ZYTHER OF DIGITALADDICTION
*
* QaN5ky5@$.j
*/

var fs      = require("fs"),
    request = require("request"),
    async   = require("async"),
    x2j     = require("xml2js"),
    tStatic = require("../../json/static.js"),
    theFile = tStatic.files.localcap();
    


// Extend String Capabilities
if (typeof String.prototype.startsWith != 'function') {
  // see below for better implementation!
  String.prototype.startsWith = function (str) {
    return this.indexOf(str) === 0;
  };
}


exports.setFeed = function(cb) {
    async.waterfall([
        function(callback) {
            request(tStatic.urls.NWS, {
                headers: {
                    'User-Agent' : "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36"
                }
            }, function(e,r,b){
               if (e) {
                   callback(e, null);
               } else {
                   // console.dir(b);
                   var parser = new x2j.Parser();
                   try {
                       parser.parseString(b, function(ee, rr) {
                           if (ee) {
                               callback(ee, null);
                           } else {
                               callback(null, rr);
                           }
                       });
                   } catch (ex) {
                       callback(ex, null);
                   }
               }
            });
        }, function(b, callback){
            try {
                var curFile = JSON.parse(fs.readFileSync(theFile));
                callback(null, b, curFile);
            } catch (ex){
                callback(ex, null);
            }
        }, function(b, curFile, callback){
            
            // console.dir(b.feed.updated.toString());
            var tUpdated, lUpdated;
            try {
                tUpdated = b.feed.updated.toString();
                lUpdated = curFile.feedUpdated.toString();
            } catch (ex) {
                callback(ex, null);
            }
            
            if (tUpdated === lUpdated){
                callback(null, null, tUpdated);
            } else {
                callback(null, b, tUpdated);    
            }
            
        }, function(b, tUpdated, callback){
            if (b === null) {
                callback(null, tUpdated, null, "No Updates.  Still at " + tUpdated);
            } else {
            
                var entriesArray = [];
                    
                async.each(b.feed.entry, function(item, cb){
                    var tID         = item.id;
                    var tUpdated    = item.updated;
                    var tPublished  = item.published;
                    var tAuthor     = item.author[0].name;
                    var tTitle      = item.title;
                    var tSummary    = item.summary;
                    var tEvent      = item["cap:event"];
                    var tEffective  = item["cap:effective"];
                    var tExpires    = item["cap:expires"];
                    var tStatus     = item["cap:status"];
                    var tMsgType    = item["cap:msgType"];
                    var tCategory   = item["cap:category"];
                    var tUrgency    = item["cap:urgency"];
                    var tSeverity   = item["cap:severity"];
                    var tCertainty  = item["cap:certainty"];
                    var tAreaDesc   = item["cap:areaDesc"];
                    var tPolygon    = item["cap:polygon"];
                    var tFIPS       = item["cap:geocode"][0].value[0];
                    var tUGC        = item["cap:geocode"][0].value[1];
                    entriesArray.push({
                        entry: {
                        cID         : tID,
                        cUpdated    : tUpdated,
                        cPublished  : tPublished,
                        cAuthor     : tAuthor,
                        cTitle      : tTitle,
                        cSummary    : tSummary,
                        cEvent      : tEvent,
                        cEffective  : tEffective,
                        cExpires    : tExpires,
                        cStatus     : tStatus,
                        cMsgType    : tMsgType,
                        cCategory   : tCategory,
                        cUrgency    : tUrgency,
                        cSeverity   : tSeverity,
                        cAreaDesc   : tAreaDesc,
                        cPolygon    : tPolygon,
                        cFIPS       : tFIPS,
                        cUGC        : tUGC,
                        cPassed     : 'no',
                        cCertainty  : tCertainty
                        }
                    });
                    
                    cb();
                    
                }, function(e){
                    if (e){
                        callback(e, null);
                    } else {
                        callback(null, tUpdated, entriesArray, null);   
                    }
                }) ;  
                
            } /* end else */
        }, function(tUpdated, entriesArray, doneMessage, callback) {
            if (entriesArray === null) {
                callback(null, doneMessage);
            } else {
                var bigArray = {
                    feedUpdated: tUpdated,
                    entries: entriesArray
                };
                fs.writeFile(theFile, JSON.stringify(bigArray, null, 4), function(e){
                    if (e) {
                        callback(e, null);
                    } else {
                        callback(null, "Saved new alerts. Type !help for help issuing commands");
                    }
                });
                
            }
        }
        
    ], function(e,d){
        if (e) {
            console.error(e);
            console.dir(e.stack);
            return cb("Error Parsing Remote XML, or Writing Local JSON.");
        } else {
            return cb(d);
        }
    });
    
};
