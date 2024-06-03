module.exports = (client, interaction) => {
 // Check if our interaction is a slash command
    if (interaction.isCommand()) {

 // Get the command from our slash command collection
    const command = client.interactions.get(interaction.commandName);

// If command does not exist return an error message
    if (!command) return interaction.reply({
      content: "Bir şeyler Ters Gitti / Belki komut kayıtlı değil mi?",
      ephemeral: true
    });

    command.run(client, interaction);
  }
}
//PARSHER YOUTUBE KANALINDA PAYLAŞILMIŞTIR