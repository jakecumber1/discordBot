//Node's native file system module, will read from the commands directory
const fs = require('node:fs')
//Node's native path utility module. path constructs paths to access files and directories. Auto detects the os and uses appropriate joiners
const path = require('node:path')
//Ensure we have the necessary discord.js classes
const { Client, Collection, Events, GatewayIntentBits, MessageFlags } = require('discord.js');
const { token } = require('./config.json');

//Create a new client instance, .Guilds is an intent option which ensures caches for guilds, channels, and roles are populated for internal use.
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

//When client is ready, run this code (once).
//the distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for typescript devs
//It makes some properties non-nullable
client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! logged in as ${readyClient.user.tag}`);
});

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        //Set new item in collection with key as the command name and value as the exported module
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property`)
        }
    }
}

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }
    
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command', flags: MessageFlags.Ephemeral});
        } else {
            await interaction.reply({ content: 'There was an error executing this command!', flags: MessageFlags.Ephemeral});
        }
    }
})

//log into discord with token
client.login(token);