const Discord = require('discord.js');
const client = new Discord.Client();
const bot = new Discord.Client();
client.commands = new Discord.Collection();
const fs = require('fs');

//////////Charge les commandes//////////
fs.readdir('./Commandes/', (error, f) => {
    if (error) { return console.error(error); }
    let commandes = f.filter(f => f.split('.').pop() === 'js');
    if (commandes.length <= 0) { return console.log('Aucune commande trouvée !'); }

    commandes.forEach((f) => {
        let commande = require(`./Commandes/${f}`);
        console.log(`${f} commande chargée !`);
        client.commands.set(commande.help.name, commande);
    });
});

/////////////Charge les events/////////////

fs.readdir('./Events/', (error, f) => {
    if (error) { return console.error(error); }
    console.log(`${f.length} events chargés`);

    f.forEach((f) => {
        let events = require(`./Events/${f}`);
        let event = f.split('.')[0];
        client.on(event, events.bind(null, client));
    });
});

const cdseconds = 5;

client.on("messageReactionAdd", (reaction, user) => {
    if (user.bot) return;
    const message = reaction.message;
    const member = message.guild.members.get(user.id)
    const STAFF = message.guild.roles.find(role => role.name == 'Staff')
    const everyone = message.guild.roles.find(role => role.name == '@everyone')

    if (
        ["⚙️", "🔒"].includes(reaction.emoji.name)
    ) {
        switch (reaction.emoji.name) {

            case "⚙️":

                let categoryID = "id de la categorie ou se crée le ticket";

                var bool = false;

                if (bool == true) return;
               
                message.guild.createChannel(`ticket-${message.author.username}`, "text").then((createChan) => {

                    createChan.setParent(categoryID).then((settedParent) => {
                        settedParent.overwritePermissions(everyone, {
                            "READ_MESSAGES": false
                        });

                        settedParent.overwritePermissions(member, {
                            "SEND_MESSAGES": true,
                            "ADD_REACTIONS": true,
                            "ATTACH_FILES": true,
                            "READ_MESSAGES": true,
                            "READ_MESSAGE_HISTORY": true
                        })

                        settedParent.overwritePermissions(STAFF, {
                            "READ_MESSAGES": true,
                            "MANAGE_MESSAGES": true
                        })

                        let embedTicketOpen = new Discord.RichEmbed()
                            .setTitle("➥ Bonjour / Bonsoir :")
                            .setColor("#FB7052")
                            .addField("➜Notre équipe d'assitance et la pour vous aider !","Pour fermer le ticket cliquer sur 🔒")
                            .setFooter("Bot by julioju")

                        settedParent.send(embedTicketOpen).then(async msg => {
                            await msg.react("🔒")
                        })
                    })
                })

                break;

            case "🔒":

                message.channel.send("**Le salon se fermera dans 10 de secondes...**")

                setTimeout(() => {
                    message.channel.delete()
                }, cdseconds * 1500)

                let embedTicketClose = new Discord.RichEmbed()
                    .setTitle(`Le ticket ${message.channel.name} a été fermer`)
                    .setColor("#FB7052")
                    .setFooter(`Bot dev par Julioju `)

                let logChannel = message.guild.channels.find(channel => channel.name == "log")  ////Message qui se mais dans le channel log quan un ticket et fermer////

                if (logChannel) {
                    logChannel.send(embedTicketClose)
                }

                break;
        }
    }
})

client.login('Token du bot')