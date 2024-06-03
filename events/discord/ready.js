const register = require('../../utils/slashsync');
module.exports = async (client) => {
  await register(client, client.register_arr.map((command) => ({
    name: command.name,
    description: command.description,
    options: command.options,
    type: 'CHAT_INPUT'
  })), {
    debug: true
  });
  // ( If you are one of those people who read the codes I highly suggest ignoring this because I am very bad at what I am doing, thanks LMAO )
  console.log(`Online`)
  let invite = `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=347200&scope=applications.commands%20bot`;
  const activities = [`made by parsher`, `prefix .`, `.help`];
  setInterval(() => {
    let activity = activities[Math.floor(Math.random() * activities.length)];
    client.user.setActivity(activity, { type: "PLAYING" });
  }, 20000);

};
//PARSHER YOUTUBE KANALINDA PAYLAŞILMIŞTIR
