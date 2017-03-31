var express = require('express'),
    getNHCW = require('../js/get/getNHCW');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    getNHCW.getNHCW(function(result){
        res.render('index', { title: 'DigitalAddiction Severe Alerting System', NHCData: result });
    });
});

module.exports = router;
