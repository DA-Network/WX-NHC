/* 
* NOW OBSOLETE, USING irc-framework VIA kIRC.js INSTEAD
*/
var irc = require('irc'),
    tStatic = require("../../json/static.js");


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
