var ard = require("app-root-dir").get(),
    lCap = ard + "/tmp/my.json";

module.exports = {
    "connect"   : {
        "useirc"    : "yes",
        "server"    : "irc.digitaladdiction.info",
        "name"      : "WX-NHC",
        "nametest"  : "WX-NHC2",
        "pw"        : "da123",
        "channel"   : "#WX",
        "nickserv"  : "nickserv",
        "identify"  : "identify da123",
        "flooddelay": 8500
    },
    
    "messages" : {
        "help" : "WX-NHC V1.1 - COMMANDS: !wx-u[pdate] - Updates the system's alert catalog || !wx-s[tate] xx - gets severe alerts for a specific state. || !wx-m[state] xx - gets MODERATE alerts for a specific state. || !wx-z[ip] xxxxx - gets all alerts for a zip code || !wx-n[hc] - gets latest atlantic nhc alert."
    },
    "options"   : {
        "gettime"   :   1200000
    },
    "files"     : {
        "localcap"  : function(){
            return lCap;
        }
    },
    "urls"      : {
        "NHC"       : "http://www.nhc.noaa.gov/xml/TWOAT.xml",
        "NWS"       : "https://alerts.weather.gov/cap/us.php?x=0"
    },
    
    "ident"     :   {
        "u"         : "da",
        "p"         : "da123"
    }
};