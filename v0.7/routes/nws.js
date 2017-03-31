var express = require('express'),
    getAllW = require('../js/get/getAllW');
var router = express.Router();




router.get('/', function(req, res, next){
    var allW = getAllW.getAllW();
    res.render('nws', {
        title: 'NWS Nationwide Alerts', 
        getAllW : allW});
});


module.exports = router;