//Ensure we have the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

//Create a new client instance, .Guilds is an intent option which ensures caches for guilds, channels, and roles are populated for internal use.
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

//When client is ready, run this code (once).
//the distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for typescript devs
//It makes some properties non-nullable
client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! logged in as ${readyClient.user.tag}`);
});

//log into discord with token
client.login(token);