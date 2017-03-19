var getX = require('../js/getXML'),
    parseX = require("../js/parseXML"),
    x2j = require('xml2js');
var twURL = "http://www.nhc.noaa.gov/xml/TWOAT.xml";

function parseXML(input, callback){
    getX.getXML(input, function(err, anXML){
        if (err) throw err;
        var parser = new x2j.Parser();
        parser.parseString(anXML, function(err, result) {
            //console.dir(result);
            callback(result);
        });
    });
}

function cleanString(input, callback){
    var thing = input.toString();
    thing = thing.replace(/\<br \/\>/g, '').split('\n').join(' ');
    callback(thing);
}

function getTW(callback) {
    parseXML(twURL, function(res){
        cleanString(res.rss.channel[0].item[0].description, function(data){
            callback(data);
        });
        
        
        
    });
}

exports.getTW = getTW;