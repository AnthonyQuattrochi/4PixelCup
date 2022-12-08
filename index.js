const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv/config');
var words = require('an-array-of-french-words');

var previouschan = "";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences
    ],
});
client.login(process.env.TOKEN);


let appellemoipas = 0;

// returns Collection

function appellemoipasla() {
    if (appellemoipas == 3) {
        appellemoipas = 0;
        return true;
    } else {
        appellemoipas = appellemoipas + 2;
        return false;
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

client.on('ready', () => {
    console.log('The bot is ready');
    //test();

});
envoiemessage();
client.on('messageCreate', message => {
    if (!message.author.bot && message.content == "::renameall") {
        var guild = message.guild;
        guild.members.cache.forEach(element => {
            console.log(element.nickname);
            if (message.guild.me.hasPermission('MANAGE_NICKNAMES')) { element.setNickname("Cookie"); }
        });
    }
    if (!message.author.bot) {
        console.log("( " + message.guild.name + " ) [ " + message.channel.name + " ] - " + message.author.username + " : " + message.content + "   [" + message.channelId + "]");
        previouschan = message.channelId;
    }
    if (appellemoipas != 0 && !message.author.bot) {
        appellemoipas = appellemoipas - 1;
    }
    if (message.content === "ping") {
        message.reply("**pong!**");
    }
    if (message.content == "<@813950398917640193>") {
        if (appellemoipasla()) {
            for (var i = 0; i < 5; i = i + 1) {
                const chan = message.channel;
                chan.send("<@" + message.author.id + ">");
            }
            message.reply("C'est marrant hein ?");
        } else {
            message.reply("Oui?");
        }
    }
    if (message.content.replace(/[^\w\s\']|_/g, "").trim().toLowerCase().endsWith("quoi") && !message.author.bot) {
        message.reply("https://tenor.com/view/feur-theobabac-quoi-gif-24294658");

    } else if (message.content.endsWith("?") && !message.author.bot && getRandomInt(10) == 5) {
        message.reply("Who asked?");
    } else if (message.content.replace(/[^\w\s\']|_/g, "").trim().toLowerCase().endsWith("ratio") && !message.author.bot && getRandomInt(3) == 2) {
        message.reply("https://tenor.com/view/yugioh-no-u-no-you-reverse-uno-uno-gif-22508660");
    } else if (message.content.trim().toLowerCase().includes("di") && !message.author.bot) {
        const str = message.content.trim().toLowerCase();
        const tmp = str.slice(str.indexOf("di") + 2);
        const finalstring = words.filter(d => tmp.split(' ')[0] == (d)).length != 0 ? tmp : tmp.slice(tmp.split(' ')[0].length);
        if (!finalstring.trim() == "") {
            message.reply(finalstring.trim());
        }
    }
})

function test() {
    const guild = client.guilds.cache.get('1025408877434511441');
    guild.members.fetch().then(members => {
        // Loop through every members
        members.forEach(member => {
            try {
                if (!member.user.bot) {
                    //guild.channels.cache.get("1049849750016503838").send("<@" + member.id + ">");

                    member.setNickname("Coucou");
                    console.log(member.nickname + " " + member.displayName);
                    setTimeout(() => { guild.channels.cache.get("1049849750016503838").send("pouet pouet"); }, 2000);
                }
            } catch (e) {
                console.log("J'ai rien pu faire pour " + member.displayName);
            }
        });
    });
}

function envoiemessage() {
    //1049849750016503838 chez moi
    let y = process.openStdin();
    y.addListener("data", res => {
        let x = res.toString().trim().split(/ +/g);
        let channelwrite = x.join(" ").split("@");
        if (channelwrite[0].length == 0) {
            if (channelwrite[2] != "") {
                try {
                    previouschan = channelwrite[1];
                    client.channels.cache.get(previouschan).send(x.join(" ").slice(previouschan.length + 2));
                } catch (e) {
                    console.log("[ERROR] : Mauvais channel, syntaxe : @id@message");
                }
            }
        } else {
            try {
                client.channels.cache.get(previouschan).send(x.join(" "));
            } catch (e) {
                console.log("[ERROR] : Mauvais channel, syntaxe : @id@message");
            }
        }
    })
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}