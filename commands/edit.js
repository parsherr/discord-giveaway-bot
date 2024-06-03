module.exports.run = async (client, message) => {
  const Discord = require("discord.js");
  const ms = require("ms");
  let time = "";
  let winnersCount;
  let prize = "";
  let giveawayx = "";
  let embed = new Discord.MessageEmbed()
    .setTitle("Bir Çekilişi Düzenleyin!")
    .setColor('#2F3136')
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTimestamp();
  const msg = await message.reply({
    embeds:
    [embed.setDescription(
      "Hangi Çekilişi Düzenlemek İstersiniz?\nÇekiliş Mesajının ID'sini Sağlayın\n **30 saniye içinde cevap verin!**"
    )]
  }
  );
  let xembed = new Discord.MessageEmbed()
    .setTitle("Oops! Görünüşe Göre Bir Zaman Aşımına Uğradık! 🕖")
    .setColor("#FF0000")
    .setDescription('💥 Şansımız yaver gitmedi!\nKarar vermek için fazla zaman aldınız!\nBir çekilişi düzenlemek için tekrar ``edit`` kullanın!\nBu sefer **30 saniye içinde** cevap vermeye çalışın!')
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTimestamp();

  const filter = m => m.author.id === message.author.id && !m.author.bot;
  const collector = await message.channel.createMessageCollector(filter, {
    max: 3,
    time: 30000
  });

  collector.on("collect", async collect => {

    const response = collect.content;
    let gid = BigInt(response).toString()
    await collect.delete()
    if (!gid) {
      return msg.edit({
        embeds: [
          embed.setDescription(
            "Uh-Oh! Görünüşe göre geçersiz bir Mesaj ID'si sağladınız!\n**Tekrar Denemek İster misiniz?**\n Örnek: ``677813783523098627``"
          )]
      }
      );
    } else {
      collector.stop(
        msg.edit({
          embeds: [
            embed.setDescription(
              `Tamam! Sonraki, Çekilişin bitmesi için yeni süre ne olmalı?\n**30 saniye içinde cevap verin!**`
            )]
        }
        )
      );
    }
    const collector2 = await message.channel.createMessageCollector(filter, {
      max: 3,
      time: 30000
    });
    collector2.on("collect", async collect2 => {

      let mss = ms(collect2.content);
      await collect2.delete()
      if (!mss) {
        return msg.edit({
          embeds: [
            embed.setDescription(
              "Ah Hayır! Görünüşe göre geçersiz bir süre sağladınız\n**Tekrar Denemek İster misiniz?**\n Örnek: ``-10 dakika``,``-10m``,``-10``\n **Not: - (eksi) sürenin azaltılmasını istediğinizi belirtir!**"
            )]
        }
        );
      } else {
        time = mss;
        collector2.stop(
          msg.edit({
            embeds: [
              embed.setDescription(
                `Tamam! Şimdi, çekiliş için kaç kazanan belirlenmeli?\n**30 saniye içinde cevap verin.**`
              )]
          }
          )
        );
      }
      const collector3 = await message.channel.createMessageCollector(filter, {
        max: 3,
        time: 30000,
        errors: ['time']
      });
      collector3.on("collect", async collect3 => {

        const response3 = collect3.content.toLowerCase();
        await collect3.delete()
        if (parseInt(response3) < 1 || isNaN(parseInt(response3))) {
          return msg.edit({
            embeds: [
              embed.setDescription(
                "Kazanan Sayısı Bir Sayı Olmalı veya birden büyük eşit olmalı!\n**Tekrar Denemek İster misiniz?**\n Örnek ``1``,``10``, vb."
              )]
          }
          );
        } else {
          winnersCount = parseInt(response3);
          collector3.stop(
            msg.edit({
              embeds: [
                embed.setDescription(
                  `Tamam! Cömert İnsan! Şimdi, çekilişin yeni ödülü ne olmalı?\n**30 saniye içinde cevap verin!**`
                )]
            }
            )
          );
        }
        const collector4 = await message.channel.createMessageCollector(
          filter,
          { max: 3, time: 30000 }
        );
        collector4.on("collect", async collect4 => {

          const response4 = collect4.content.toLowerCase();
          prize = response4;
          await collect4.delete()
          collector4.stop(
            console.log(giveawayx),
            msg.edit({
              embeds: [
                embed.setDescription(
                  `Edited`
                )]
            }
            )
          );
          client.giveawaysManager.edit(gid, {
            newWinnersCount: winnersCount,
            newPrize: prize,
            addTime: time
          })
        });
      });
    });
  });
  collector.on('end', (collected, reason) => {
    if (reason == 'time') {
      message.reply({ embeds: [xembed] });
    }
  })
  try {
    collector2.on('end', (collected, reason) => {
      if (reason == 'time') {

        message.reply({ embeds: [xembed] });
      }
    });
    collector3.on('end', (collected, reason) => {
      if (reason == 'time') {
        message.reply({ embeds: [xembed] });

      }
    })
    collector4.on('end', (collected, reason) => {
      if (reason == 'time') {

        message.reply({ embeds: [xembed] });
      }
    })
  } catch (e) { }
}
//PARSHER YOUTUBE KANALINDA PAYLAŞILMIŞTIR