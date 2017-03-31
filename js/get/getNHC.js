var async   = require("async"),
    request = require("request"),
    x2j     = require("xml2js"),
    tStatic = require("../../json/static.js");
    

exports.getNHC = function(cb){
    console.log("Getting the most current NHC feed...");
    async.waterfall([
        function(callback) {
            request(tStatic.urls.NHC, function(e,r,b){
                if (e) {
                    callback(e, null);
                } else {
                    callback(null, b);
                }
                
            });
        }, function(b, callback) {
            var parser = new x2j.Parser();
            parser.parseString(b, function(e,r){
                if (e) {
                    callback(e, null);
                } else {
                    callback(null, r);
                }
            });
        }, function (xS, callback) {
            try {
                var thing = xS.rss.channel[0].item[0].description.toString();
                thing = thing.replace(/\<br \/\>/g, '').split('\n').join(' ');
                callback(null, thing);
            } catch (ex) {
                callback(ex, null);
            }
        }
        ], function(e,d) {
            if (e) {
                console.error(e);
                return cb("Could not parse TWOAT");
            } else {
                return cb(d);
            }
            
        });
}