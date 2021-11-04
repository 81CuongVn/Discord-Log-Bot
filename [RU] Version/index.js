const Discord = require("discord.js"); //Библиотека
const client = new Discord.Client(); //Создание клиента
const config = require("./config.json"); //Загрузка конфига

var //Позже, перемещу в конфиг. В прочем, вы и сами можете.
  enable_voice_log = true,
  enable_joinexit_log = true;

//===========================================================
client.on('ready', () => { //Бот запущен
    console.log(`✅ Запущен от имени бота: ${client.user.tag}!`)
});
//===========================================================

//Сообщение отправлено
client.on('message', function(message) {
    if(message.author.bot) return; //Если автор сообщения бот, игнорируем
    
    if(message.attachments.size > 0) { //Если сообщение с вложением
        //Отправляем лог в канал логов
        sendLog(
            '✏️**[Сообщение с вложением отправлено]**✏️', 
            '#0099ff', 
            '**Автор:** <@!' + message.author + '>\n\
            **Канал:** <#' + message.channel + '>\n\
            **[Сообщение:](' + message.url + ')** ' + message.content,
            message.attachments.first().url);
    }
    else { //Если сообщение без вложения
        //Отправляем лог в канал логов
        sendLog(
            '✏️**[Сообщение отправлено]**✏️', 
            '#0099ff', 
            '**Автор:** <@!' + message.author + '>\n\
            **Канал:** <#' + message.channel + '>\n\
            **[Сообщение:](' + message.url + ')** ' + message.content);
    }
});

//=============================================
//Сообщение удалено
client.on('messageDelete', function(message) {
    if(message.channel.type == 'text') {
        if(message.attachments.size > 0) { //Если сообщение с вложением
            //Отправляем лог в канал логов
            sendLog(
                '🗑️**[Сообщение с вложением удалено]**🗑️', 
                '#ff0f0f', 
                '**Автор:** <@!' + message.author + '>\n\
                **Канал:** <#' + message.channel + '>\n\
                **Сообщение:** ' + message.cleanContent,
                message.attachments.first().url);
        }
        else {
            //Отправляем лог в канал логов
            sendLog(
                '🗑️**[Сообщение удалено]**🗑️', 
                '#ff0f0f', 
                '**Автор:** <@!' + message.author + '>\n\
                **Канал:** <#' + message.channel + '>\n\
                **Сообщение:** ' + message.cleanContent);
        }
    }
});

//=============================================
//Сообщение изменено
client.on('messageUpdate', function(oldMessage, newMessage) {
    if (newMessage.channel.type == 'text' && newMessage.cleanContent != oldMessage.cleanContent) {
        if(newMessage.attachments.size > 0) { //Если сообщение с вложением
            //Отправляем лог в канал логов
            sendLog(
                '📝**[Сообщение с вложением изменено]**📝', 
                '#fe900b', 
                '**Автор:** <@!' + newMessage.author + '>\n\
                **Канал:** <#' + newMessage.channel + '>\n\
                **Старое Сообщение:** ' + oldMessage.cleanContent + '\n\
                **[Новое сообщение:](' + newMessage.url + ')** ' + newMessage.cleanContent,
                newMessage.attachments.first().url);
        }
        else {
            //Отправляем лог в канал логов
            sendLog(
                '📝**[Сообщение изменено]**📝', 
                '#fe900b', 
                '**Автор:** <@!' + newMessage.author + '>\n\
                **Канал:** <#' + newMessage.channel + '>\n\
                **Старое Сообщение:** ' + oldMessage.cleanContent + '\n\
                **[Новое сообщение:](' + newMessage.url + ')** ' + newMessage.cleanContent);
        }
    }
});

//=============================================
//Логи голосовых каналов
client.on('voiceStateUpdate', function(oldState, newState) {
    if(enable_voice_log == true) {
        if(oldState.member.user.bot) return; //Проверка на бота.
        if(newState.channelID !== null && oldState.channelID !== null) {
            if(oldState.channelID !== newState.channelID) {
                //Отправляем лог в канал логов
                sendLog(
                    '🔊**[Переход в другой голосовой канал]**🔊', 
                    '#fe900b', 
                    '**Перешёл:** <@!' + oldState.member + '>\n\
                    **Из:** ' + oldState.channel.name + '\n\
                    **В:** ' + newState.channel.name);
            }
        }
        else if(oldState.channelID === null) {
            //Отправляем лог в канал логов
            sendLog(
                '🔊**[Вошёл в голосовой канал]**🔊', 
                '#0099ff', 
                '**Вошёл:** <@!' + newState.member + '>\n**Канал:** ' + newState.channel.name);
        }
        else if(newState.channelID === null) {
            //Отправляем лог в канал логов
            sendLog(
                '🔊**[Вышёл из голосового канала]**🔊', 
                '#ff0f0f', 
                '**Вышёл:** <@!' + oldState.member + '>\n**Канал:** ' + oldState.channel.name);
        }
    }
});

//===========================================================

//=============================================
//Логи Вход/выход

client.on('guildMemberAdd', function(member) {
    if(enable_joinexit_log == true) {
        if(member.user.bot) return; //Проверка на бота
        //Отправляем лог в канал логов
        sendLog(
            '🎊**[Вошёл на сервер]**🎊', 
            '#a56a03', 
            '**Имя:** <@!' + member + '>');
    }
});

client.on('guildMemberRemove', function(member) {
    if(enable_joinexit_log == true) {
        if(member.user.bot) return; //Проверка на бота
        if(enable_joinexit_log == true) {
            //Отправляем лог в канал логов
            sendLog(
                '☹️**[Покинул сервер]**☹️', 
                '#8b0101', 
                '**Имя:** <@!' + member + '>');
        }
    }
});

//===========================================================

//=============================================



//===========================================================



//===========================================================



//=============================================
//Функции

//Конструктор Embed с отправкой в канал логов
function sendLog(title, color, description, image) {
    //Конструктор Embed с логом
    const Embed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setImage(image);

    return client.channels.cache.get(config.LOGCHANNEL).send(Embed); //Отправляем лог в канал логов
}

//===========================================================

client.login(config.BOT_TOKEN); //Подключение к боту