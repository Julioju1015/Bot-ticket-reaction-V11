const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {
var sender = message.author
const help_embed = new Discord.RichEmbed()
.setTitle('Ticket Bot :')
.setDescription("Je suis un Bot Discord à t'a disposision")

.addField("Prefix :",`**t\***`)                                                                                                                               
.addField(":question: • **Mes commands**","`t*ticketsetup`") 
.addField("**__Information :__**","**__[Support](https://discord.gg/5DFvm4c)__**")
.setFooter(`Bot dev par Julioju`)

.setColor("#FB7052")
.setThumbnail(client.avatarURL)

message.channel.send(help_embed);
console.log("help embed")
}

module.exports.help = {
    name: "help"
};
