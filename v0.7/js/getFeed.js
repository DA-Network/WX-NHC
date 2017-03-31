var fs = require('fs');
//var theFile = '/var/lib/openshift/5716f45f7628e18b28000069/app-root/runtime/repo/tmp/my.json';
var ard = require("app-root-dir").get();
var theFile = ard + "/tmp/my.json";
var getX = require('./getXML');
var parseX = require('./parseXML');


// Extend String Capabilities
if (typeof String.prototype.startsWith != 'function') {
  // see below for better implementation!
  String.prototype.startsWith = function (str) {
    return this.indexOf(str) === 0;
  };
}

function getCurrentFeed(tIN, callback) {
    var obj = JSON.parse(fs.readFileSync(tIN));
    callback(obj.feedUpdated.toString());
}

function compareUpdateFeed(callback) {
    parseX.fParseXML(getX.theURL, function(res){
        getCurrentFeed(theFile, function(data) {
            // callback(res.feed.updated.toString());
            var tRes;
                try {
                    tRes = res.feed.updated.toString();
                } catch (ex){
                    tRes = data.toString();
                    console.dir(ex);
                }
            
                if (data.toString() == tRes) {
                    callback("Feed has not changed. " + data.toString() + '  ' + res.feed.updated.toString());
                }
                else {
                    console.log("Not Equal. " + data.toString() + ' ' + res.feed.updated.toString());
                    parseX.writeJSON(function (fin) {
                        callback(fin + " " + res.feed.updated.toString());
                    });
                }
        
        });
    });
        
}


exports.compareUpdateFeed = compareUpdateFeed;