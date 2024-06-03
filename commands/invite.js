const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const config = require('../config.json');

module.exports.run = async (client, message, args) => {
    const row = new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setLabel(`${client.user.username}'i Davet et`)
        .setStyle('LINK')
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=347200&scope=applications.commands%20bot`),
        new MessageButton()
        .setLabel('Destek sunucusu')
        .setStyle('LINK')
        .setURL("https://discord.gg/bdfd"),
    )
    let invite = new MessageEmbed()
    .setAuthor(`Davet ${client.user.username} `, client.user.avatarURL())
    .setTitle("Davet & Destek sunucusu!")
    .setDescription(`${client.user} botunu bu gün davet et ve leziz çekilişlerin tadını çıkart!`)
    .setColor('#2F3136')
    .setTimestamp()
    .setFooter(`Requested by ${message.author.tag} | GiveawayBot™ (Made by Parsher)`, message.author.displayAvatarURL())
    message.reply({ embeds: [invite], components: [row]});
}
//PARSHER YOUTUBE KANALINDA PAYLAŞILMIŞTIR