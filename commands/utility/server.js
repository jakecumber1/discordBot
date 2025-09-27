const { SlashCommandBuilder } = require('discord.js')

//Create class for building slash commands
//placed inside module.exports so they are exposed to other files like command loader and command deployment
//This is what allows require() to work with other files
module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Provides server info.'),
    async execute (interaction) {
        //interaction.guild is the object representing the guild in which the command was run
        await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
    },
};