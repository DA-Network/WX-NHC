/* 
getState.js
Written by Zyther of DigitalAddiction
*/

var fs      = require("fs"),
    tStatic = require("../../json/static.js"),
    theFile = tStatic.files.localcap();

module.exports = {
    getState   : function(input, type) {
            var ret = [], 
                theCount = 0, 
                file;
                
        
        if (type === "Severe" || type === "Moderate"){
        
            try { 
                file = JSON.parse(fs.readFileSync(theFile));
            } catch (ex) {
                ret.push("Could not parse local alerts.");
                return ret;
            }
            
            
            for (var i in file.entries) {
                if (file.entries[i].entry.cSeverity.toString() === type) {
                    var tUGC = file.entries[i].entry.cUGC.toString();
                    var aUGC = tUGC.split(" ");
                    for (var j in aUGC) {
                        if (aUGC[j].startsWith(input)) {
                            ret.push("State: " + input + ' ' +  file.entries[i].entry.cSummary + '  Expires: ' + file.entries[i].entry.cExpires);
                            theCount++;
                            break;
                        }
                    }
                }
                
            }
            
            if (theCount === 0) {
                ret.push("No " + type + " alerts for " + input);
            } else {
                ret.push("No more " + type  + " alerts for " + input );
            }
            
            return ret;
            
        } else {
            ret.push("Invalid Severity. Try again.");
            return ret;
        }
        
        
    }, 
    getModerate : function(input){
        
    }
}