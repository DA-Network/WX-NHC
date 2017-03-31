/*
getForecast.js

 */

var F = require('forecast.io'),
    H = require('http'),
    util = require('util');

// http://maps.googleapis.com/maps/api/geocode/json?address=
function getLatLong(zip, cb){


    var Ll = H.get({
        host: "maps.googleapis.com",
        path: "/maps/api/geocode/json?address=" + zip
    }, function(res){
        var data = "";
        res.on('data', function(d){
            data += d;
        });
        res.on('end', function(){
            var dD;
            try {
                dD = JSON.parse(data);
            } catch (ex){
                return cb("Cannot parse LatLong Info.", false);
            }
            return cb(dD, true);
        });
    });
    Ll.on('error', function(e){
        return cb(e);
    });




    


}

function getForecast(zip, cb) {


    getLatLong(zip, function (d, t) {
        if (t) {
            if (d.status === "OK") {
                var lat = d.results[0].geometry.location.lat;
                var lng = d.results[0].geometry.location.lng;
                var f = new F({
                    APIKey: "b950047a321e58e13df6dfc8278e434d"
                });

                f.get(lat, lng, function(eee,rrr,ddd){
                    if (eee){
                        console.dir(eee);
                        return cb("Error getting weather. Sorry.", false);
                    } else {
                        //console.log('res: ' + util.inspect(r));
                        //return cb(ddd.currently, true);
                        var cur = ddd.currently;
                        return cb("Current Conditions: " + cur.summary + 
                            ". Temp (f): " + cur.temperature + 
                            ". Feels Like (f): " + cur.apparentTemperature +    
                            ". Humidity: " + cur.humidity * 100 + "%" + 
                            ". Precipitation Probability: " + cur.precipProbability * 100 + "%" +
                            ". Dew Point: " + cur.dewPoint + 
                            ". Wind Speed (MPH): " + cur.windSpeed + 
                            ". Pressure: " + cur.pressure + "mb" +
                            ". OZone: " + cur.ozone + "DU");
                    }
                })
                //return cb(d.results[0].geometry.location, true);
            } else {
                
            }
        } else { 
            return cb(d, false);
        }


        
        

        //console.dir(dD.results[0]);
    });

}

exports.getForecast = getForecast;