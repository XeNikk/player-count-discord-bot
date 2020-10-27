const Discord = require('discord.js');
const client = new Discord.Client();
const cfg = require("./config");
const Gamedig = require('gamedig');

function getPlayers() {
    Gamedig.query({
        type: cfg.config.game,
        host: cfg.config.serverIP,
        port: cfg.config.port
    }).then((data) => {
        client.user.setActivity(`${data.raw.numplayers}/${data.maxplayers}`)
    }).catch((error) => {
        console.log("ERROR: SERVER NOT FOUND");
    });
}

client.on('ready', () => {
    console.log(`Ready!`);
    setInterval(function(){
        getPlayers();
    }, cfg.config.refreshInteval)
});

client.login(cfg.config.token);