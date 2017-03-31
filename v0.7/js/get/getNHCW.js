var getX = require('../getXML'),
    parseX = require("../parseXML"),
    x2j = require('xml2js'),
    gStatic = require("../getStatic");

var tStatic = gStatic.fStatic();

function parseXML(input, callback){
    getX.getXML(input, function(err, anXML){
        if (err) throw err;
        var parser = new x2j.Parser();
        parser.parseString(anXML, function(err, result) {
            if (err) throw err;
            //console.dir(result);
            else {
            callback(result);
            }
        });
    });
}

function cleanString(input, callback){
    var thing = input.toString();
    thing = thing.replace(/\<br \/\>/g, '');
    callback(thing);
}

function getNHCW(callback) {
    console.log('Getting most current NHC Feed...');
    parseXML(tStatic.urls.NHC, function(res){
        cleanString(res.rss.channel[0].item[0].description, function(data){
            callback(data);
        });
    });
}
exports.getNHCW = getNHCW;