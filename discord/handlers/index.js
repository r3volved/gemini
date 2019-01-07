module.exports = () => {

    //Create new discord client
    const Discord = require('discord.js')
    Bot.discord.client = new Discord.Client()
    
    //Attach discord event handlers
    Bot.discord.client.on('channelCreate',      require("./channelCreate.js"));
    Bot.discord.client.on('channelDelete',      require("./channelDelete.js"));
    Bot.discord.client.on('channelPinsUpdate',  require("./channelPinsUpdate.js"));
    Bot.discord.client.on('channelUpdate',      require("./channelUpdate.js"));

    Bot.discord.client.on('clientUserGuildSettingsUpdate',  require("./clientUserGuildSettingsUpdate.js"));
    Bot.discord.client.on('clientUserSettingsUpdate',       require("./clientUserSettingsUpdate.js"));

    Bot.discord.client.on('debug',      require("./debug.js"));
    Bot.discord.client.on('disconnect', require("./disconnect.js"));

    Bot.discord.client.on('emojiCreate', require("./emojiCreate.js"));
    Bot.discord.client.on('emojiDelete', require("./emojiDelete.js"));
    Bot.discord.client.on('emojiUpdate', require("./emojiUpdate.js"));

    Bot.discord.client.on('error', require("./error.js"));

    Bot.discord.client.on('guildBanAdd',            require("./guildBanAdd.js"));
    Bot.discord.client.on('guildBanRemove',         require("./guildBanRemove.js"));
    Bot.discord.client.on('guildCreate',            require("./guildCreate.js"));
    Bot.discord.client.on('guildDelete',            require("./guildDelete.js"));
    Bot.discord.client.on('guildMemberAdd',         require("./guildMemberAdd.js"));
    Bot.discord.client.on('guildMemberAvailable',   require("./guildMemberAvailable.js"));
    Bot.discord.client.on('guildMemberRemove',      require("./guildMemberRemove.js"));
    Bot.discord.client.on('guildMembersChunk',      require("./guildMembersChunk.js"));
    Bot.discord.client.on('guildMemberSpeaking',    require("./guildMemberSpeaking.js"));
    Bot.discord.client.on('guildMemberUpdate',      require("./guildMemberUpdate.js"));
    Bot.discord.client.on('guildUnavailable',       require("./guildUnavailable.js"));
    Bot.discord.client.on('guildUpdate',            require("./guildUpdate.js"));

    Bot.discord.client.on('message',                    require("./message.js"));
    Bot.discord.client.on('messageDelete',              require("./messageDelete.js"));
    Bot.discord.client.on('messageDeleteBulk',          require("./messageDeleteBulk.js"));
    Bot.discord.client.on('messageReactionAdd',         require("./messageReactionAdd.js"));
    Bot.discord.client.on('messageReactionRemove',      require("./messageReactionRemove.js"));
    Bot.discord.client.on('messageReactionRemoveAll',   require("./messageReactionRemoveAll.js"));
    Bot.discord.client.on('messageUpdate',              require("./messageUpdate.js"));

    Bot.discord.client.on('presenceUpdate', require("./presenceUpdate.js"));
    Bot.discord.client.on('rateLimit',      require("./rateLimit.js"));
    Bot.discord.client.on('ready',          require("./ready.js"));
    Bot.discord.client.on('reconnecting',   require("./reconnecting.js"));
    Bot.discord.client.on('resume',         require("./resume.js"));

    Bot.discord.client.on('roleCreate', require("./roleCreate.js"));
    Bot.discord.client.on('roleDelete', require("./roleDelete.js"));
    Bot.discord.client.on('roleUpdate', require("./roleUpdate.js"));

    Bot.discord.client.on('typingStart',    require("./typingStart.js"));
    Bot.discord.client.on('typingStop',     require("./typingStop.js"));

    Bot.discord.client.on('userNoteUpdate', require("./userNoteUpdate.js"));
    Bot.discord.client.on('userUpdate',     require("./userUpdate.js"));

    Bot.discord.client.on('voiceStateUpdate',   require("./voiceStateUpdate.js"));
    Bot.discord.client.on('warn',               require("./warn.js"));
    
    //Sign in to discord
    Bot.discord.client.login( Bot.config.token );

}
