
const { MessageEmbed , MessageActionRow, MessageSelectMenu } = require("discord.js")

module.exports = {
    name: 'help',
    description: '📜 View all the commands available to the bot!',
    run: async (client, interaction) => {
        const embed = new MessageEmbed()
        .setTitle(`Commands of ${client.user.username}`)
        .setColor('#2F3136')
        .setDescription('**Type `.help` for help menu**')
        .addField(`Links:`,`- [Youtube Channel](https://www.youtube.com/channel/UCKpRtKCWoZMNeiIRviOtd1w)\n- [Discord Server](https://discord.gg/bdfd)`,true)
        .setTimestamp()
        .setFooter(`Requested by ${interaction.user.username} | GiveawayBot™`, interaction.user.displayAvatarURL());
        
         
    },
};
