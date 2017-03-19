var irc = require('irc'),
    gStatic = require('../getStatic.js');

var tStatic = gStatic.fStatic();
var bot = new irc.Client(tStatic.connect.server, 
                         tStatic.connect.name, {
                         autoConnect: false,
                         userName: tStatic.connect.name,
                         realName: tStatic.connect.name,
                         channels: [tStatic.connect.channel], 
                         floodProtection: true, 
                         floodProtectionDelay: tStatic.connect.flooddelay
                         });
module.exports = bot;