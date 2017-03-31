var ard = require("app-root-dir").get(),
    lCap = ard + "/tmp/my.json";

module.exports = {
    "connect"   : {
        "useirc"    : "yes",
        "server"    : "irc.digitaladdiction.info",
        "name"      : "WX-NHC",
        "pw"        : "da123",
        "channel"   : "#WX",
        "nickserv"  : "nickserv",
        "identify"  : "identify da123",
        "flooddelay": 6000
    },
    
    "messages" : {
        "help" : "DA Severe Weather Alerting System (DASWAS). V1.0 - COMMANDS: !wx-update - Updates the system's alert catalog || !wx-all - gets all severe alerts. (currently disabled) || !wx-state xx - gets severe alerts for a specific state. || !wx-mstate xx - gets MODERATE alerts for a specific state. || !wx-zip xxxxx - gets all alerts for a zip code || !wx-nhc - gets latest atlantic nhc alert. "
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