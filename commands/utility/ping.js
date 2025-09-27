const { SlashCommandBuilder } = require('discord.js')
const wait = require('node:timers/promises').setTimeout;

//Create class for building slash commands
//placed inside module.exports so they are exposed to other files like command loader and command deployment
//This is what allows require() to work with other files
module.exports = {
    cooldown: 5,
    //set the name of our command to ping and its display description
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    //can be accessed with interaction.client
    async execute (interaction) {
        //most common method to respond
        //interaction tokens are only valid for 3 seconds, if we want to reply any later
        //we'll need to implement deferred responses
        //Note that this is only for the first interaction, we can take as long as we want before we do something like an edit
        await interaction.reply('Pong!');
        //Example of deleting a reply
        /*
        await interaction.deleteReply();
        */
        /*
        Example of editing a response
        await wait(2_000);
        await interaction.editReply('Pong again!');
        */
       /*
       Below is an example of if we wanted a deferred reply
       remember the use case is if our first interaction takes longer than 3 seconds

       await interaction.deferReply();
       await wait(4_000)
       
       Call interaction.deferReply() as soon as possible for long tasks
       We might also write the statement like this for confirmation:
       await interaction.deferReply({ flags: MessageFlags.Ephemeral });
       */
      //Example of a follow up response, reply() and deferReply() are initial responses ONLY
      //Trying to send another reply will have discord telling us to kick sand
      await interaction.followUp('Pong again!');
      /*
        For some use cases we may want to handle the Message object itself, here's an example:
        //save the message object in a const var call response
        const response = await interaction.reply({ content: 'pong!', withResponse: true });
        //Print the message to console
        console.log(response.resource.message);    
    */
    /*
        Finally for replies, we might want a localized response based on user location,
        this won't be relevant for anything I personally make at the moment, but will be useful to document
        if i want to make anything to be used in big servers:

        const locales = {
            de: 'hallo welt!'
        };
        //establish a reply with the default being english
        interaction.reply(locales[interaction.locale] ?? 'Hello world')
    */
    },
};