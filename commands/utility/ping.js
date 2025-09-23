const { SlashCommandBuilder } = require('discord.js')

//Create class for building slash commands
//placed inside module.exports so they are exposed to other files like command loader and command deployment
//This is what allows require() to work with other files
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    //can be accessed with interaction.client
    async execute (interaction) {
        await interaction.reply('Pong!');
    },
};