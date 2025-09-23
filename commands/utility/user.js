const { SlashCommandBuilder } = require('discord.js')

//Create class for building slash commands
//placed inside module.exports so they are exposed to other files like command loader and command deployment
//This is what allows require() to work with other files
module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Provides user info.'),
    async execute (interaction) {
        //interaction.user = object representing user who ran the command
        //interaction.member is a GuildMember object, which represents the user in the specific guild
        await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}`);
    },
};