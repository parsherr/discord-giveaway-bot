const ms = require('ms');
module.exports.run = async (client, message, args) => {

    // If the member doesn't have enough permissions
    if(!message.member.permissions.has('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.reply(':x: Hediyeleri yeniden dağatmak için mesajları yönet izinlerine sahip olmanız gerekir.');
    }

    // If no message ID or giveaway name is specified
    if(!args[0]){
        return message.reply(':x: Geçerli bir ID belirtmeniz gerekir!');
    }

    // try to found the giveaway with prize then with ID
    let giveaway = 
    // Search with giveaway prize
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
    // Search with giveaway ID
    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    // If no giveaway was found
    if(!giveaway){
        return message.reply('İçin bir hediye bulamıyor `'+ args.join(' ') +'`.');
    }

    // Reroll the giveaway
    client.giveawaysManager.reroll(giveaway.messageID)
    .then(() => {
        // Success message
        message.reply('Çekiliş yeniden dağatıldı!');
    })
    .catch((e) => {
        if(e.startsWith(`bu ID ye sahip çekiliş ${giveaway.messageID} bitmedi.`)){
            message.reply('Bu çekiliş hâlâ bitmedi!');
        } else {
            console.error(e);
            message.reply(e);
        }
    });

};