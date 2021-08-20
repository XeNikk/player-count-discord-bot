const Discord = require('discord.js');
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS]});
const cfg = require("./config");
const Gamedig = require('gamedig');

function getPlayers() {
    Gamedig.query({
        type: cfg.config.game,
        host: cfg.config.serverIP,
        port: cfg.config.port
    }).then((data) => {
        client.user.setActivity(`${data.raw.numplayers}/${data.maxplayers}`)
        let channel = client.channels.cache.get(cfg.config.channelID)
        if(channel) {
            channel.setName(cfg.config.channelText + data.raw.numplayers)
        }
    }).catch((error) => {
        console.log("ERROR: SERVER NOT FOUND");
    });
}

client.on('ready', () => {
    console.log(`Ready!`);
    getPlayers();
    setInterval(function(){
        getPlayers();
    }, cfg.config.refreshInteval)
});

client.login(cfg.config.token);
