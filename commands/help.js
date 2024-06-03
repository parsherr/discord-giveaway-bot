const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
const config = require('../config.json');

module.exports.run = async (client, message, args) => {

const embed = new MessageEmbed()
.setTitle(`Commands of ${client.user.username}`)
.setColor('#2F3136')
.setDescription('**Please Select a category to view all its commands**')
.addField(`Links:`,`- [Youtube Channel](https://www.youtube.com/channel/UCKpRtKCWoZMNeiIRviOtd1w)\n- [Discord Server](https://discord.gg/bdfd)`,true)
.setTimestamp()
.setFooter(`Requested by ${message.author.username} | GiveawayBot™ (Made by Parsher)`, message.author.displayAvatarURL());

  const giveaway = new MessageEmbed()
  .setTitle("Categories » Giveaway")
  .setColor('#2F3136')
  .setDescription("```yaml\nBot Prefix : .```")
  .addFields(
    { name: 'Create / Start'  , value: `Start a giveaway in your guild!`, inline: true },
    { name: 'Edit' , value: `Edit an already running giveaway!`, inline: true },
    { name: 'End' , value: `End an already running giveaway!`, inline: true },
    { name: 'List' , value: `List all the giveaways running within this guild!`, inline: true },
    { name: 'Pause' , value: `Pause an already running giveaway!`, inline: true },
    { name: 'Reroll' , value: `Reroll an ended giveaway!`, inline: true },
  )
  .setTimestamp()
  .setFooter(`Requested by ${message.author.username} | GiveawayBot™ (Made by Parsher)`, message.author.displayAvatarURL());


  const general = new MessageEmbed()
  .setTitle("Categories » General")
  .setColor('#2F3136')
  .setDescription("```yaml\nBot Prefix : .```")
  .addFields(
    { name: 'Help'  , value: `Shows all available commands to this bot!`, inline: true },
    { name: 'Invite' , value: `Get the bot's invite link!`, inline: true },
    { name: 'Ping' , value: `Check the bot's websocket latency!`, inline: true },
  )
  .setTimestamp()
  .setFooter(`Requested by ${message.author.username} | GiveawayBot™ (Made by Parsher)`, message.author.displayAvatarURL());
//PARSHER YOUTUBE KANALINDA PAYLAŞILMIŞTIR
  const components = (state) => [
    new MessageActionRow().addComponents(
        new MessageSelectMenu()
        .setCustomId("help-menu")
        .setPlaceholder("Please Select a Category")
        .setDisabled(state)
        .addOptions([{
                label: `Giveaways`,
                value: `giveaway`,
                description: `View all the giveaway based commands!`,
                emoji: `🎉`
            },
            {
                label: `General`,
                value: `general`,
                description: `View all the general bot commands!`,
                emoji: `⚙`
            }
        ])
    ),
];
//PARSHER YOUTUBE KANALINDA PAYLAŞILMIŞTIR
const initialMessage = await message.reply({ embeds: [embed], components: components(false) });

const filter = (interaction) => interaction.user.id === message.author.id;

        const collector = message.channel.createMessageComponentCollector(
            {
                filter,
                componentType: "SELECT_MENU",
                time: 300000
            });

        collector.on('collect', (interaction) => {
            if (interaction.values[0] === "giveaway") {
                interaction.update({ embeds: [giveaway], components: components(false) });
            } else if (interaction.values[0] === "general") {
                interaction.update({ embeds: [general], components: components(false) });
            }
        });
        collector.on('end', () => {
          initialMessage.edit({ components: components(true) });
      }
      )
}
//PARSHER YOUTUBE KANALINDA PAYLAŞILMIŞTIR