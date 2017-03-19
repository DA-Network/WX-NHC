var https   = require('https'),
    http    = require('http');
	
exports.theURL = "https://alerts.weather.gov/cap/us.php?x=0";




function getXML(url, callback) {
	var tOptions = {
		host: "alerts.weather.gov",
		headers: {
			'user-agent' : "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36"
		},
		path: "/cap/us.php?x=0"
	};
    if(url.startsWith("https")){
        var req = https.get(tOptions, function (res) {
            var xml = '';
            res.on('data', function (chunk) {
                xml += chunk;
            });

            res.on('end', function () {
                callback(null, xml);
            });

        });

        req.on('error', function (err) {
            callback(err.stack.toString());
            console.log(err);
        });
    } else {
        var req = http.get(url, function (res) {
            var xml = '';
            res.on('data', function (chunk) {
                xml += chunk;
            });

            res.on('end', function () {
                callback(null, xml);
            });


        });

        req.on('error', function (err) {
            callback(err.stack.toString());
            console.log(err);
        });
    }
}



exports.getXML = getXML;