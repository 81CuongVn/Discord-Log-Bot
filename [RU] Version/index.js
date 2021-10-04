const Discord = require("discord.js"); //Библиотека
const client = new Discord.Client(); //Создание клиента
const config = require("./config.json"); //Загрузка конфига

//===========================================================
client.on('ready', () => { //Бот запущен
    console.log(`✅ Запущен от имени бота: ${client.user.tag}!`)
});
//===========================================================

//Сообщение отправлено
client.on('message', function(message) {
    if(message.author.bot) return; // Если автор сообщения бот, игнорируем
    if(message.attachments.size > 0) { // Если сообщение с вложением
        //Переменная... Так проще
        var log = message.guild.channels.cache.get(config.LOGCHANNEL)

        //отправляем лог в канал логов
        if(log != null){
            const Embed = new Discord.MessageEmbed()

                .setColor('#0099ff')
                .setTitle('✏️**[Сообщение с вложением отправлено]**✏️')
                .setDescription('**Автор:** <@!' + message.author + '>\n**Канал:** <#' + message.channel + '>\n**[Сообщение:](' + message.url + ')** ' + message.content)
                .setImage(message.attachments.first().url);

            log.send(Embed);
        }
    }
    else { // Если сообщение без вложения

        //Переменная... Так проще
        var log = message.guild.channels.cache.get(config.LOGCHANNEL)

        //отправляем лог в канал логов
        if(log != null){
            const Embed = new Discord.MessageEmbed()

                .setColor('#0099ff')
                .setTitle('✏️**[Сообщение отправлено]**✏️')
                .setDescription('**Автор:** <@!' + message.author + '>\n**Канал:** <#' + message.channel + '>\n**[Сообщение:](' + message.url + ')** ' + message.content);
            
            log.send(Embed);
        }
    }
});

//=============================================
//Сообщение удалено
client.on('messageDelete', function(message) {
    if(message.channel.type == 'text') {
        if(message.attachments.size > 0) { // Если сообщение с вложением
            //Переменная... Так проще
            var log = message.guild.channels.cache.get(config.LOGCHANNEL)
    
            //отправляем лог в канал логов
            if(log != null){
                const Embed = new Discord.MessageEmbed()
    
                    .setColor('#ff0f0f')
                    .setTitle('🗑️**[Сообщение с вложением удалено]**🗑️')
                    .setDescription('**Автор:** <@!' + message.author + '>\n**Канал:** <#' + message.channel + '>\n**Сообщение:** ' + message.cleanContent)
                    .setImage(message.attachments.first().url);
    
                log.send(Embed);
            }
        }
        else {
            //Переменная... Так проще
            var log = message.guild.channels.cache.get(config.LOGCHANNEL)

            //отправляем лог в канал логов
            if(log != null){
                const Embed = new Discord.MessageEmbed()

                    .setColor('#ff0f0f')
                    .setTitle('🗑️**[Сообщение удалено]**🗑️')
                    .setDescription('**Автор:** <@!' + message.author + '>\n**Канал:** <#' + message.channel + '>\n**Сообщение:** ' + message.cleanContent);
            
                log.send(Embed);
            }
        }
    }
});

//=============================================
//Сообщение изменено
client.on('messageUpdate', function(oldMessage, newMessage) {
    if (newMessage.channel.type == 'text' && newMessage.cleanContent != oldMessage.cleanContent) {
        if(newMessage.attachments.size > 0) { // Если сообщение с вложением
            //Переменная... Так проще
            var log = newMessage.guild.channels.cache.get(config.LOGCHANNEL)
    
            //отправляем лог в канал логов
            if(log != null){
                const Embed = new Discord.MessageEmbed()
    
                    .setColor('#fe900b')
                    .setTitle('📝**[Сообщение с вложением изменено]**📝')
                    .setDescription('**Автор:** <@!' + newMessage.author + '>\n**Канал:** <#' + newMessage.channel + '>\n**Старое Сообщение:** ' + oldMessage.cleanContent + '\n**[Новое сообщение:](' + newMessage.url + ')** ' + newMessage.cleanContent)
                    .setImage(newMessage.attachments.first().url);
    
                log.send(Embed);
            }
        }
        else {
            //Переменная... Так проще
            var log = newMessage.guild.channels.cache.get(config.LOGCHANNEL)

            //отправляем лог в канал логов
            if(log != null){
                const Embed = new Discord.MessageEmbed()

                    .setColor('#fe900b')
                    .setTitle('📝**[Сообщение изменено]**📝')
                    .setDescription('**Автор:** <@!' + newMessage.author + '>\n**Канал:** <#' + newMessage.channel + '>\n**Старое Сообщение:** ' + oldMessage.cleanContent + '\n**[Новое сообщение:](' + newMessage.url + ')** ' + newMessage.cleanContent);
            
                log.send(Embed);
            }
        }
    }
});

//=============================================
//Добавлена реакция

// Продолжение следует

//===========================================================

client.login(config.BOT_TOKEN); //Подключение к боту