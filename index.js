const { Client, GatewayIntentBits, Message, TextInputStyle } = require('discord.js');
require('dotenv/config');
var words = require('an-array-of-french-words');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
});

let appellemoipas = 0;

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
});
envoiemessage();
client.on('messageCreate', message => {
    if (!message.author.bot) {
        console.log("( " + message.guild.name + " ) [ " + message.channel.name + " ] - " + message.author.username + " : " + message.content + "   [" + message.channelId + "]")
    }
    if (appellemoipas != 0 && !message.author.bot) {
        appellemoipas = appellemoipas - 1;
    }
    if (message.content === "ping") {
        message.reply("**pong!**");
    }
    if (message.content == "<@813950398917640193>") {
        if (appellemoipasla()) {
            message.reply("<@" + message.author.id + ">");
            message.reply("<@" + message.author.id + ">");
            message.reply("<@" + message.author.id + ">");
            message.reply("<@" + message.author.id + ">");
            message.reply("<@" + message.author.id + ">");
            message.reply("<@" + message.author.id + ">");
            message.reply("<@" + message.author.id + ">");
            message.reply("<@" + message.author.id + ">");
            message.reply("<@" + message.author.id + ">");
            message.reply("<@" + message.author.id + ">");
            message.reply("<@" + message.author.id + ">");
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
    if (message.content == "/test") {
        const guild = client.guilds.fetch('1025408877434511441').members;
        //const members = guild. // returns Collection
        console.log(guild);
    }
})

function envoiemessage() {
    //426856848650403850 chez big
    //1049849750016503838 chez moi
    let y = process.openStdin();
    y.addListener("data", res => {
        let x = res.toString().trim().split(/ +/g);
        let channelwrite = x.join(" ").split("@");
        if (channelwrite[2] != "") {
            try {
                client.channels.cache.get(channelwrite[1]).send(x.join(" ").slice(channelwrite[1].length + 2));
            } catch (e) {
                console.log("[ERROR] : Mauvais channel, syntaxe : @id@message");
            }
        }
    })
}


client.login(process.env.TOKEN);