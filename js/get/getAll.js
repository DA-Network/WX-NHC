var tStatic = require("../../json/static.js"),
    fs      = require("fs");

module.exports = {
    getAll  : function() {
        console.log("Getting all...");
        var ret = [];
        var tFile = tStatic.files.localcap().toString();
        
        try {
        
            var obj = JSON.parse(fs.readFileSync(tFile));
            
            for (var i in obj.entries) {
                
                    if (obj.entries[i].entry.cSeverity.toString() === "Severe") {
                        
                        ret.push(
                            "UGC: " + obj.entries[i].entry.cUGC + ' ' +  
                            obj.entries[i].entry.cSummary + 
                            '  Expires: ' + obj.entries[i].entry.cExpires
                        );
                        
                    }
                    
            }
            
            ret.push("End of all alerts.");
            
            return(ret);
            
        } catch (ex) {
            
            ret.push("error getting all alerts.");
            
            console.error(ex);
            
            return ret;
        }
    },
    getNothing : function() {
        return null;
    }
};