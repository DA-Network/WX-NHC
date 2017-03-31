/*
getZip.js
written by Alec Ghazarian -- ZytherXYZ
 */

var fs = require('fs'),
    ht = require('https'),
    gStatic = require('../getStatic');

var tStatic = gStatic.fStatic();
// var temPath = tStatic.files.localcap;
//var temPath = "/Users/alecg/Desktop/openShift/wx/nhc/tmp/my.json";
var ard = require("app-root-dir").get();
var temPath = ard + "/tmp/my.json";
var zipLoc = "quiet-escarpment-77456.herokuapp.com";


function getZ(input, cb){
    if (input.length !== 5){
        return cb("Please enter a valid zip code.");
    } else {
        var req = ht.get({
            host: zipLoc,
            path: '/v1/zip/' + input
        }, function (res) {
            var b = '';
            res.on('data', function (d) {
                b += d;
            });
            res.on('end', function () {
                return cb(b);
            })
        })
        req.on('error', function(e){
            return cb(e);
        });
    }
    /*
    for (i in obj.entries) {
        if (obj.entries[i].entry.cSeverity.toString() == "Severe"){
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
        ret.push("No severe alerts for " + input);
    }
    else {
        ret.push("No more alerts for " + input);
    }
    return(ret);
    */

}
function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function getZip(zip, cb){
    getZ(zip, function(d){
        if (d !== "Please enter a valid zip code.") {
            //console.log(d);
            var tF;
            
            
            //caught! 06/09/16
            
            try {
                tF = JSON.parse(d);
            } catch (ex){
                return cb([d], false);
            }
            
            
            var theCount = 0;
            var ret = [];

            var obj = JSON.parse(fs.readFileSync(temPath));

            for (i in obj.entries) {
                thFIPS = obj.entries[i].entry.cFIPS.toString();
                aFIPS = thFIPS.split(' ');
                for (j in aFIPS) {
                    console.log(aFIPS[j]);
                    if (aFIPS[j].toString() === pad(tF.fips_code, 6).toString()) {
                        ret.push("Zip: " + zip + ' ' + obj.entries[i].entry.cSummary + " " +  obj.entries[i].entry.cSeverity +  '.  Expires: ' + obj.entries[i].entry.cExpires);
                        theCount = theCount + 1;
                        break;
                    }
                }
            }
            if (theCount === 0) {
                ret.push("No weather alerts for " + zip);
            }
            else {
                ret.push("No more alerts for " + zip);
            }
            return cb(ret, true);
        } else {
            return cb([d], false);
        }



        // return cb(pad(tF.fips_code, 6));

    });
}

exports.getZip = getZip;