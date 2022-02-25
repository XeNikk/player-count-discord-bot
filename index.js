const { config } = require("./config"); // Configuration

// Modules
const Discord = require('discord.js'),
      Gamedig = require('gamedig');

// Counting alternator
function countAlternator(count = 0) {
    // little parser
    if (typeof count !== "number") {
        switch (typeof count) {
            case "string":
                count = parseInt(count);
                break;
            default:
                if (typeof count !== "number") throw Error(`Excepted at 'count' arg a "number", got '${typeof count}'`);
        }
    }

    return count === 1 ? `${count} player` : `${count} players`;
}

// Asynchrous gathering players count/players data
async function getPlayers() {
    const query = await Gamedig.query({ type: config.game, host: config.serverIP, port: config.port });

    if (query) {
        client.user.setActivity(`${countAlternator(data.raw.numplayers)}/${countAlternator(data.maxplayers)}`);
        
        const channel = client.channels.cache.get(config.channelID);

        if (channel) channel.setName(config.channelText + data.raw.numplayers);
    }
}

client.on('ready', () => {
    console.log(`Ready!`);
    getPlayers();
    setInterval(async function(){
        await getPlayers();
    }, config.refreshInteval)
});

client.login(config.token);
