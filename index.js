const Discord = require("discord.js"); //Library
const client = new Discord.Client(); //Client creation
const config = require("./config.json"); //Config loading

var //Later, I will move it to the config. Besides, you yourself can.
  enable_voice_log = true,
  enable_joinexit_log = true;

//===========================================================
client.on('ready', () => { //Bot launched
    console.log(`✅ Launched as a bot: ${client.user.tag}!`)
});
//===========================================================
//Message sent
client.on('message', function(message) {
    if(message.author.bot) return; //If the author of the message is a bot, ignore

    if(message.attachments.size > 0) { //If a message with an attachment
        //Sending a log to the log channel
        sendLog(
            '✏️**[Message sent with attachment]**✏️', 
            '#0099ff', 
            '**Author:** <@!' + message.author + '>\n\
            **Channel:** <#' + message.channel + '>\n\
            **[Message:](' + message.url + ')** ' + message.content,
            message.attachments.first().url);
    }
    else { //If a message with an attachment
        //Sending a log to the log channel
        sendLog(
            '✏️**[Message sent]**✏️', 
            '#0099ff', 
            '**Author:** <@!' + message.author + '>\n\
            **Channel:** <#' + message.channel + '>\n\
            **[Message:](' + message.url + ')** ' + message.content);
    }
});

//=============================================
//Message deleted
client.on('messageDelete', function(message) {
    if(message.channel.type == 'text') {
        if(message.attachments.size > 0) { //If a message with an attachment
            //Sending a log to the log channel
            sendLog(
                '🗑️**[Message with attachment deleted]**🗑️', 
                '#ff0f0f', 
                '**Author:** <@!' + message.author + '>\n\
                **Channel:** <#' + message.channel + '>\n\
                **Message:** ' + message.cleanContent,
                message.attachments.first().url);
        }
        else {
            //Sending a log to the log channel
            sendLog(
                '🗑️**[Message deleted]**🗑️', 
                '#ff0f0f', 
                '**Author:** <@!' + message.author + '>\n\
                **Channel:** <#' + message.channel + '>\n\
                **Message:** ' + message.cleanContent);
        }
    }
});

//=============================================
//Message changed
client.on('messageUpdate', function(oldMessage, newMessage) {
    if (newMessage.channel.type == 'text' && newMessage.cleanContent != oldMessage.cleanContent) {
        if(newMessage.attachments.size > 0) { //If a message with an attachment
            //Sending a log to the log channel
            sendLog(
                '📝**[Message with attachment changed]**📝', 
                '#fe900b', 
                '**Author:** <@!' + newMessage.author + '>\n\
                **Channel:** <#' + newMessage.channel + '>\n\
                **Old Post:** ' + oldMessage.cleanContent + '\n\
                **[New message:](' + newMessage.url + ')** ' + newMessage.cleanContent,
                newMessage.attachments.first().url);
        }
        else {
            //Sending a log to the log channel
            sendLog(
                '📝**[Message changed]**📝', 
                '#fe900b', 
                '**Author:** <@!' + newMessage.author + '>\n\
                **Channel:** <#' + newMessage.channel + '>\n\
                **Old Post:** ' + oldMessage.cleanContent + '\n\
                **[New message:](' + newMessage.url + ')** ' + newMessage.cleanContent);
        }
    }
});

//=============================================
//Voice channel logs
client.on('voiceStateUpdate', function(oldState, newState) {
    if(enable_voice_log == true) {
        if(oldState.member.user.bot) return; //If the author of the message is a bot, ignore
        if(newState.channelID !== null && oldState.channelID !== null) {
            if(oldState.channelID !== newState.channelID) {
                //Sending a log to the log channel
                sendLog(
                    '🔊**[Switch to another voice channel]**🔊', 
                    '#fe900b', 
                    '**Moved:** <@!' + oldState.member + '>\n\
                    **From:** ' + oldState.channel.name + '\n\
                    **To:** ' + newState.channel.name);
            }
        }
        else if(oldState.channelID === null) {
            //Sending a log to the log channel
            sendLog(
                '🔊**[Entered the voice channel]**🔊', 
                '#0099ff', 
                '**Has entered:** <@!' + newState.member + '>\n**Channel:** ' + newState.channel.name);
        }
        else if(newState.channelID === null) {
            //Sending a log to the log channel
            sendLog(
                '🔊**[Logged out of the voice channel]**🔊', 
                '#ff0f0f', 
                '**Came out:** <@!' + oldState.member + '>\n**Channel:** ' + oldState.channel.name);
        }
    }
});

//===========================================================

//=============================================
//Logs Enter/Exit

client.on('guildMemberAdd', function(member) {
    if(enable_joinexit_log == true) {
        if(member.user.bot) return; //If the author of the message is a bot, ignore
        //Sending a log to the log channel
        sendLog(
            '🎊**[Entered into the server]**🎊', 
            '#a56a03', 
            '**Name:** <@!' + member + '>');
    }
});

client.on('guildMemberRemove', function(member) {
    if(enable_joinexit_log == true) {
        if(member.user.bot) return; //If the author of the message is a bot, ignore
        if(enable_joinexit_log == true) {
            //Sending a log to the log channel
            sendLog(
                '☹️**[Left the server]**☹️', 
                '#8b0101', 
                '**Name:** <@!' + member + '>');
        }
    }
});

//===========================================================

//=============================================



//===========================================================



//===========================================================



//=============================================
//Functions

//Embed constructor with sending logs to the channel
function sendLog(title, color, description, image) {
    //Embed constructor with log
    const Embed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setImage(image);

    return client.channels.cache.get(config.LOGCHANNEL).send(Embed); //Sending a log to the log channel
}

//===========================================================

client.login(config.BOT_TOKEN); //Connect to the bot