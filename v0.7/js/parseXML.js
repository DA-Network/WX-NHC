var x2j = require('xml2js'),
    fs = require("fs"),
    getX = require('./getXML.js');
	
	var ard = require("app-root-dir").get();
	var theFile = ard + "/tmp/my.json";

function fParseXML(input, callback){
    getX.getXML(input, function(err, anXML){
        var parser = new x2j.Parser();
        parser.parseString(anXML, function(err, result) {
            //console.dir(result);
            callback(result);
        });
    });
}


function makeEntriesArray(callback){
    //TODO
    var entriesArray = [];
    
    fParseXML(getX.theURL, function(data){
        
        var feedInfo = data.feed.updated;
        
        for (i in data.feed.entry){
            //console.dir(data.feed.entry[i]);
            var tID = data.feed.entry[i].id;
            var tUpdated = data.feed.entry[i].updated;
            var tPublished = data.feed.entry[i].published;
            var tAuthor = data.feed.entry[i].author[0].name;
            var tTitle = data.feed.entry[i].title;
            // var tLink = data.feed.entry[i].link["$"]["href"];
            var tSummary = data.feed.entry[i].summary;
            var tEvent = data.feed.entry[i]["cap:event"];
            var tEffective = data.feed.entry[i]["cap:effective"];
            var tExpires = data.feed.entry[i]["cap:expires"];
            var tStatus = data.feed.entry[i]["cap:status"];
            var tMsgType = data.feed.entry[i]["cap:msgType"];
            var tCategory = data.feed.entry[i]["cap:category"];
            var tUrgency = data.feed.entry[i]["cap:urgency"];
            var tSeverity = data.feed.entry[i]["cap:severity"];
            var tCertainty = data.feed.entry[i]["cap:certainty"];
            var tAreaDesc = data.feed.entry[i]["cap:areaDesc"];
            var tPolygon = data.feed.entry[i]["cap:polygon"];
            var tFIPS = data.feed.entry[i]["cap:geocode"][0].value[0];
            var tUGC = data.feed.entry[i]["cap:geocode"][0].value[1];
            entriesArray.push({
                entry: {
                cID: tID,
                cUpdated: tUpdated,
                cPublished: tPublished,
                cAuthor: tAuthor,
                cTitle: tTitle,
                cSummary: tSummary,
                cEvent: tEvent,
                cEffective: tEffective,
                cExpires: tExpires,
                cStatus: tStatus,
                cMsgType: tMsgType,
                cCategory: tCategory,
                cUrgency: tUrgency,
                cSeverity: tSeverity,
                cAreaDesc: tAreaDesc,
                cPolygon: tPolygon,
                cFIPS: tFIPS,
                cUGC: tUGC,
                cPassed: 'no'
                }
                
            });
            
            //console.log(tPolygon);
        
            //for (j in data.feed.entry[i]["cap:geocode"]){
            //    console.dir(data.feed.entry[i]["cap:geocode"][j]);
            //}
            //console.log(tID + "\n" + tUpdated + "\n" + tPublished + "\n" + tAuthor + "\n" + );

        }

    callback(feedInfo, entriesArray);
});
}


function makeBigArray(callback) {
    makeEntriesArray(function(fData, eData){
        var bigArray = {
            feedUpdated: fData,
            entries: eData
        };
        callback(bigArray);
    });
}


function writeJSON(callback) {
	
    var outFile = theFile;
    makeBigArray(function(data){
        fs.writeFile(outFile, JSON.stringify(data, null, 4), function(err){
            if(err){
                console.log(err);
            }
            else {
                fs.writeFile(theFile, JSON.stringify(data,null, 4), function(err2){
                    if(err2){
                        console.log(err2);
                    }
                    else {
                        callback("Saved new alerts. Type '!help' for help issuing commands.");
            
                    }
                });
                }
        });
    });
}

exports.fParseXML = fParseXML;
exports.writeJSON = writeJSON;