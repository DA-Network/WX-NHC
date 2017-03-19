var fs = require('fs'),
    gStatic = require('../getStatic');
	var ard = require("app-root-dir").get();
var theFile = ard + "/tmp/my.json";

var tStatic = gStatic.fStatic();

function getStateM(input){
    var obj = JSON.parse(fs.readFileSync(theFile));
    var theCount = 0;
    var ret = [];
    for (i in obj.entries) {
        if (obj.entries[i].entry.cSeverity.toString() == "Moderate"){
            thUGC = obj.entries[i].entry.cUGC.toString();
            aUGC = thUGC.split(' ');
            for (j in aUGC) {
                if (aUGC[j].startsWith(input)) {
                    ret.push("State: " + input + ' ' +  obj.entries[i].entry.cSummary + '  Expires: ' + obj.entries[i].entry.cExpires);
                    theCount = theCount + 1;
                    break;
                }
            }
        }
    }
    if (theCount === 0){
        ret.push("No moderate alerts for " + input);
    }
    else {
    ret.push("No more alerts for " + input);
    }
    return(ret);
    
}
exports.getStateM = getStateM;