var fUpd = require('../getFeed');

function setFeed(callback){
    fUpd.compareUpdateFeed(function(data){
      callback(data);
    });
}
exports.setFeed = setFeed;