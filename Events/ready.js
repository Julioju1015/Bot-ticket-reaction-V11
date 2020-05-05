const Discord = require("discord.js");

module.exports = (client) => {


    console.log(`${client.user.username} est en ligne`);

    //client.user.setActivity("/help", {type: "LISTENING"});

    let statuses = [
        //`la Maintenance`
        `t*help | regarde ${client.users.size} membres`,
        `t*help | Salut mon gars`,
        `t*help | Bot dev par julioju#7775`
    ]

    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        client.user.setActivity(status, {type: "WATCHING"}); 

    }, 20000);

};

