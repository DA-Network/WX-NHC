/*

getWeather.js

an implementation of weather-js

 */

var wJ = require('weather-js');


function getWeather(zip, cb){
    wJ.find({
        search: zip,
        degreeType: 'F',
    }, function(e,r){
        if (!e){
            var idx = 0;
            r.forEach(function(d){
                if (idx===0) {
                    var theStr = "Currently, in "+ d.location.name + " it's " + d.current.skytext +" at "+  d.current.temperature + "*F. Humidity: " + d.current.humidity + "%. Winds " + d.current.winddisplay;
                    //console.dir(d);
                    idx++;
                    return cb(theStr);
                    
                }
            });
            

        } else {
            console.dir(e);
            return cb("Error getting live weather. Try again.");
        }
    })
}


exports.getWeather = getWeather;