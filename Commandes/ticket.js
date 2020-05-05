const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {


    message.delete()
 
    let TicketEmbed = new Discord.RichEmbed()
    .setColor("#FB7052")
    .setAuthor("Ticket Bot")
    .setTitle("** Le Staff de Pala'Express vous présente son système de commande par ticket.**")
    .setDescription(" et salut c'est le petit bot de ticket")

    .addField("**➥ __Bonjour / Bonsoir__ ?**","Une question ou autre merci de cliquer sur ⚙️ et un ticket s’ouvrira !")
    .setFooter(`Bot dev par Julioju `)


    message.channel.send(TicketEmbed).then(async msg => {
        msg.react("⚙️")
    })
}
 
module.exports.help = {
    name: "ticketsetup"
}
 

