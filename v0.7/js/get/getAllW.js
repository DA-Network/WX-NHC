var fs = require('fs'),
    gStatic = require('../getStatic');
    
function getAllW() {
    var tStatic = gStatic.fStatic();
    var obj = JSON.parse(fs.readFileSync(tStatic.files.localcap.toString()));
    return(obj);
}
exports.getAllW = getAllW;