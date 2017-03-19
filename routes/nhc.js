var express = require('express'),
    getAllW = require('../js/get/getAllW');
var router = express.Router();




router.get('/', function(req, res, next){
    var allW = getAllW.getAllW();
    res.render('nhc', {
        stuff: 'This will be the NHC homepage.', 
        title: 'Weather Alerts', 
        getAllW : allW});
});


module.exports = router;