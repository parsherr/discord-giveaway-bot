const Discord = require('discord.js'),
  { MessageEmbed } = Discord,
  parsec = require('parsec'),
  messages = require('../utils/message');
module.exports.run = async (client, message) => {
  const collector = message.channel.createMessageCollector({
    filter: (m) => m.author.id === message.author.id,
    time: 60000,
  });

  let xembed = new MessageEmbed()
  .setTitle("Eyvah! Görünüşe göre Bir Zaman Aşımıyla Karşılaştık.! 🕖")
  .setColor("#FF0000")
  .setDescription('💥 Şansımızı yakala!\nKarar vermek için çok zaman harcadın!\nYeni bir hediye başlatmak için tekrar `create` u kullanın!!\nBu sefer ** 30 saniye ** içinde yanıt vermeye çalışın!')
  .setFooter(client.user.username, client.user.displayAvatarURL())
  .setTimestamp()

//PARSHER YOUTUBE KANALINDA PAYLAŞILMIŞTIR
  function waitingEmbed(title, desc) {
    return message.channel.send({
      embeds: [
        new MessageEmbed()
          .setAuthor(
            message.author.tag + ' | Çekiliş kurulumu',
            message.member.displayAvatarURL()
          )
          .setTitle('Çekiliş ' + title)
          .setDescription(desc + ' önümüzdeki 60 saniye içinde.')
          .setFooter(
            "Bu işlemden çıkmak için 'cancel' yazın.",
            client.user.displayAvatarURL()
          )
          .setTimestamp()
          .setColor('#2F3136'),
      ],
    });
  }

  let winnerCount, channel, duration, prize, cancelled;

  await waitingEmbed('Ödül', 'Lütfen çekiliş ödülünü yazın');

  collector.on('collect', async (m) => {
    if (cancelled) return;

    async function failed(options, ...cancel) {
      if (typeof cancel[0] === 'boolean')
        (cancelled = true) && (await m.reply(options));
      else {
        await m.reply(
          options instanceof MessageEmbed ? { embeds: [options] } : options
        );
        return await waitingEmbed(...cancel);
      }
    }

    if (m.content === 'cancel') return await failed('Çekişiş başlatma iptal edildi.', true);

    switch (true) {
      case !prize: {
        if (m.content.length > 256)
          return await failed(
            'Ödül 256 karakterden fazla olamaz.',
            'Ödül',
            'Lütfen çekiliş ödülünü yazın'
          );
        else {
          prize = m.content;
          await waitingEmbed('Kanal', 'Lütfen çekiliş kanalını yazın.');
        }

        break;
      }

      case !channel: {
        if (!(_channel = m.mentions.channels.first() || m.guild.channels.cache.get(m.content)))
          return await failed(
            'Lütfen geçerli bir kanal / kanal kimliği gönderin.',
            'Kanal',
            'Lütfen hediye kanalını gönderin'
          );
        else if (!_channel.isText())
          return await failed(
            'Kanal bir metin kanalı olmalıdır.',
            'Kanal',
            'Lütfen hediye kanalını gönderin'
          );
        else {
          channel = _channel;
          await waitingEmbed(
            'Kazanan Sayısı',
            'Lütfen hediye kazanan sayısını gönderin.'
          );
        }

        break;
      }

      case !winnerCount: {
        if (!(_w = parseInt(m.content)))
          return await failed(
            'Kazananların sayısı bir tam sayı olmalıdır.',

            'Kazanan Sayısı',
            'Lütfen hediye kazanan sayısını gönderin.'
          );
        if (_w < 1)
          return await failed(
            'Kazanan sayısı 1den fazla olmalıdır.',
            'Kazanan Sayısı',
            'Lütfen hediye kazanan sayısını gönderin.'
          );
        else if (_w > 15)
          return await failed(
            'Kazanan sayısı 15ten az olmalıdır.',
            'Kazanan Sayısı',
            'Lütfen hediye kazanan sayısını gönderin.'
          );
        else {
          winnerCount = _w;
          await waitingEmbed('Süre', 'Lütfen hediye süresini gönderin');
        }

        break;
      }

      case !duration: {
        if (!(_d = parsec(m.content).duration))
          return await failed(
            'Lütfen geçerli bir süre belirtin.',
            'Süre',
            'Lütfen hediye süresini gönderin'
          );
        if (_d > parsec('21d').duration)
          return await failed(
            'Süre 21 günden az olmalıdır!',
            'Süre',
            'Lütfen hediye süresini gönderin'
          );
        else {
          duration = _d;
        }

        return client.giveawaysManager.start(channel, {
          prize,
          duration,
          winnerCount,
          messages,
          hostedBy: client.config.hostedBy && message.author,
        });
      }
    }
  });
  collector.on('end', (collected, reason) => {
    if (reason == 'time') {
       message.reply({ embeds: [xembed]})
    }
  })
};
//PARSHER YOUTUBE KANALINDA PAYLAŞILMIŞTIR