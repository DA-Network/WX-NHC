/* 
using kiwi's irc-framework
Written by Zyther of DigitalAddiction (ZytherXYZ)
April 3rd, 2017
*/

var IRC         =   require("irc-framework"),
    S           =   require("string"),
    $$          =   S,
    fStatic     =   require("../../json/static.js"),
    setFeed     =   require("../set/setFeed"),
    getAll      =   require('../get/getAll'),
    getNHC      =   require('../get/getNHC'),
    getState    =   require("../get/getState"),
    getZip      =   require('../get/getZip'),
    getForecast =   require('../get/getForecast'),
    bot         =   new IRC.Client();

var cO = {
    host: fStatic.connect.server,
    port: 6667,
    nick: fStatic.connect.name
};


var messageQueue = [];

// message queue 
setInterval(function(){
    if (messageQueue.length) {
        bot.say(fStatic.connect.channel, messageQueue[0]);
        messageQueue.splice(0,1);
    }
}, fStatic.connect.flooddelay);

// set the feed every 10 mins
setInterval(function(){
    setFeed.setFeed(function(d){
        console.log(d);
    });
}, 600000);


var isAuthed = false;

bot.connect(cO);

bot.on("registered", function(ev) {
    setTimeout(function(){
        bot.say("nickserv", "identify da123");
    }, 1000);

});

bot.on("message", function(ev){
    if (ev.nick.toLowerCase() === "nickserv" && 
        ev.message === "Password accepted - you are now recognized."  && 
        isAuthed === false ) {
            console.dir("I authed.");
            isAuthed = true;
            bot.join(fStatic.connect.channel);
        }

    console.dir(ev);

    if (ev.target === "#wx" && ev.type === "privmsg") {
        var tMessage = ev.message.toString().toLowerCase();
        var isCommand = ($$(tMessage).startsWith("!wx-") || $$(tMessage).startsWith("!help"));
        if (isCommand) {
            if ($$(tMessage).startsWith("!help") || $$(tMessage).startsWith("!wx-help")) {
                messageQueue.push(fStatic.messages.help);
            }
            if ($$(tMessage).startsWith("!wx-")){
                if ($$(tMessage).startsWith("!wx-s ") || $$(tMessage).startsWith("!wx-state ") ) {
                    var tMess = tMessage.split(' ');
                    var tSt = getState.getState(tMess[1].toString().toUpperCase(), "Severe");
                    for (var si in tSt) {
                        messageQueue.push(tSt[si]);
                    }
                } else
                if ($$(tMessage).startsWith("!wx-m ") || $$(tMessage).startsWith("!wx-mstate ")){
                    var tMess1 = tMessage.split(' ');
                    var tStM = getState.getState(tMess1[1].toString().toUpperCase(), "Moderate");
                    for (var mi in tStM) {
                        messageQueue.push(tStM[mi]);
                    }
                } else 
                if (tMessage === "!wx-nhc" || tMessage === "!wx-n") {
                    getNHC.getNHC(function(data){
                        messageQueue.push(data);
                    });
                } else
                if (tMessage === "!wx-u" || tMessage === "!wx-update") {
                    setFeed.setFeed(function(data){
                        messageQueue.push(data);
                    });
                } else
                if ($$(tMessage).startsWith("!wx-z ") || $$(tMessage).startsWith("!wx-zip ")) {
                    messageQueue.push("This feature is undergoing maintenance.");
                } else {
                    messageQueue.push("Unknown command. Type !help for supported commands");
                }
            }

        }
        console.log(tMessage + " " + isCommand);
        
    }
    





});

bot.on("error", function(er){
    throw new Error(er);
})


module.exports = bot;

