var fs = require('fs'),
    gStatic = require('../getStatic');
	var ard = require("app-root-dir").get();
var theFile = ard + "/tmp/my.json";
function getAll () {
    console.log('Getting all...');
    var tStatic = gStatic.fStatic();
    var obj = JSON.parse(fs.readFileSync(theFile));
    var ret = [];
    for (i in obj.entries) {
        if (obj.entries[i].entry.cSeverity.toString() == "Severe"){
            ret.push("UGC: " + obj.entries[i].entry.cUGC + ' ' +  obj.entries[i].entry.cSummary + '  Expires: ' + obj.entries[i].entry.cExpires);
        }
    }
    ret.push('End of all alerts.');
    return(ret);
}
exports.getAll = getAll;