var bot = require('./irc'),
    gStatic     =   require('../getStatic'),
    getAll      =   require('../get/getAll'),
    getNHC      =   require('../get/getNHC'),
    getState    =   require("../get/getState"),
    getZip      =   require('../get/getZip'),
    getForecast =   require('../get/getForecast'),
    getStateM   =   require('../get/getStateM'),
    getWeather  =   require('../get/getWeather'),
    setFeed     =   require("../set/setFeed");
    
    
var tStatic = gStatic.fStatic();

// define interval (20 minutes)
var theInterval = 1200000;


bot.connect(function(){
  // identify with nickserv on connect
  console.log("Connected to IRC.");
  bot.say(tStatic.connect.nickserv, tStatic.connect.identify);
});


//error handling
bot.addListener('error', function(mes){
  console.log('er. ', mes);
});

setInterval(function(){
  setFeed.setFeed(function(data){
    bot.say(tStatic.connect.channel, data);
  });
}, tStatic.options.gettime);


//Bots Message listener
bot.addListener('message', function(from, to, message){
  console.log(from + ' said: ' + message);
  //convert messgae to string and uppercase
  var tMessage = message.toString().toUpperCase();
  
  //help message
  if (tMessage.startsWith("!HELP")) {
    bot.say(tStatic.connect.channel, tStatic.messages.help);
  }
  if (tMessage.startsWith("!WX-HELP")) {
    bot.say(tStatic.connect.channel, tStatic.messages.help);
  }
  
  //get all severe in US (RETURNS ARRAY)
  if (tMessage.startsWith("!WX-ALL")) {
    /*
    var tAll = getAll.getAll();
    for (i in tAll) {
        bot.say(tStatic.connect.channel, tAll[i]);
    }
    */
    bot.say(tStatic.connect.channel, "This function has been temporarily disabled.");
  }
  
  //get NHC alert
  if (tMessage.startsWith("!WX-NHC")) {
    getNHC.getNHC(function(data){
        bot.say(tStatic.connect.channel, data);
    });
  }
  
  
  //get severe alerts by state
  if (tMessage.startsWith("!WX-STATE")) {
    var tMess = tMessage.split(' ');
    var tSt = getState.getState(tMess[1].toString());
    for (i in tSt) {
        bot.say(tStatic.connect.channel, tSt[i]);
    }
  }
  if (tMessage.startsWith("!WX-M")) {
    var tMess1 = tMessage.split(' ');
    var tStM = getStateM.getStateM(tMess1[1].toString());
    for (i in tStM) {
        bot.say(tStatic.connect.channel, tStM[i]);
    }
  }

  if (tMessage.startsWith("!WX-ZIP")) {
    var tMess2 = tMessage.split(' ');
    getZip.getZip(tMess2[1].toString(), function(d, r){
      if (r) {
        getForecast.getForecast(tMess2[1].toString(), function(ddd){
          bot.say(tStatic.connect.channel, ddd);
          for (i in d) {
            bot.say(tStatic.connect.channel, d[i]);
          }
        });
        
      } else {
          bot.say(tStatic.connect.channel, d[i]);
      }
    });
  }
  
  
  
  //manually update feed
  if (tMessage.startsWith("!WX-UPDATE")) {
    setFeed.setFeed(function(data){
        bot.say(tStatic.connect.channel, data);
    });
  }
  
  //Add Reload
  
  
  
});

module.exports = bot;