const { Collection, Events, MessageFlags } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
            if (!interaction.isChatInputCommand()) return;


            const command = interaction.client.commands.get(interaction.commandName);

            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }

            

            //Initialize cooldowns if they don't exist
            if (!interaction.client.cooldowns) {
                interaction.client.cooldowns = new Collection();
                console.log('Initialized cooldowns collection in interaction handler');
            }

            const cooldowns = interaction.client.cooldowns;

            if (!cooldowns.has(command.data.name)) {
                cooldowns.set(command.data.name, new Collection());
            }
            //Current timestamp
            const now = Date.now();
            //Reference to collection of user ids and timestamp, key/values for the triggered command
            const timestamps = cooldowns.get(command.data.name);
            //Default if no cooldown is specified
            const defaultCooldownDuration = 3;
            //Nullish coalescing operator
            //Basically if left is undefined or null, pick the defaultCooldownDuration
            //Why not use '||'? since we're checking time, we don't want 0 to be registered as false
            //in case we want the command to have no cooldown
            //multiplied by 1000 since milliseconds are easier to handle here
            const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;

            if (timestamps.has(interaction.user.id)) {
                const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

                if (now < expirationTime) {
                      const timeLeft = expirationTime - now;
                    let remainingTime;
                    //If more than a minute, display the message in minutes, else seconds
                    if (timeLeft >= 60000) {
                        remainingTime = `${Math.ceil(timeLeft / 60000)} minutes`;
                    } else {
                        remainingTime = `${Math.ceil(timeLeft / 1000)} seconds`;
                    }
                    const expiredTimestamp = Math.round(expirationTime / 1000);
                    //Ephemeral flags just means it's hidden from everyone except the caller of the command
                    //so in this instance only the person who sent the command will recieve the cooldown message
                    return interaction.reply({ content: `Please wait, you are on cooldown for \`${command.data.name}\`. You can use it again in ${remainingTime} (<t:${expiredTimestamp}:R>)`, 
                        flags: MessageFlags.Ephemeral});
                }
            }
            //after the cooldown is over, delete the command entry for the user, signaling the cooldown has expired
            timestamps.set(interaction.user.id, now);
            setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

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
    
        },
};