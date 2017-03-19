/* Get, Read, and Parse static JSON */
var fs = require('fs');
//var staticJSON = '/var/lib/openshift/5716f45f7628e18b28000069/app-root/runtime/repo/json/static.json';

var ard = require("app-root-dir").get();
var staticJSON = ard + "/json/static.json";

function fStatic(){
    var obj = JSON.parse(fs.readFileSync(staticJSON));
    return(obj);
}

function getHelp(callback) {
    fStatic(staticJSON, function(data){
       callback(data.messages.help); 
    });
}

exports.staticJSON = staticJSON;
exports.fStatic = fStatic;
exports.getHelp = getHelp;