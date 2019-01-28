//Report the client status
module.exports = async ( monitor ) => {

    const clientOptions = Bot.discord.client.options
    
    let mem = []
    const used = process.memoryUsage();
    for (let key in used) {
      mem.push(`${key} : ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
    }
    
    let uptime = Bot.discord.client.uptime / 60000
    uptime = uptime < 60 
        ? uptime.toFixed(2)+" min"
        : uptime / 60
        
    uptime = Number(uptime) 
        ? uptime < 24
            ? uptime.toFixed(2)+" hours"
            : uptime / 24
        : uptime 

    uptime = Number(uptime) 
        ? uptime.toFixed(2)+" days"
        : uptime 
      
    monitor.response = {
        embed:{
            title: `**${Bot.discord.client.user.username} status**`,
            description: [
                `**App Core** : ${Bot.app.name}`,
                `**App Version** : @${Bot.app.version}`,
                `**App Description** : ${Bot.app.description}`
            ],
            fields:[{    
                name: `**== Bot details ================**`,
                value: [
                    `**ID** : ${Bot.discord.client.user.id}`,
                    `**Tag** : ${Bot.discord.client.user.tag}`,
                    `**Ready** : ${(new Date(Bot.discord.client.readyTimestamp)).toLocaleString()}`,
                    `**Uptime** : ${uptime}`,
                    `**Ping** : ${Bot.discord.client.ping.toFixed(2)} ms`,
                    `**Guilds** : ${Bot.discord.client.guilds.size}`,
                    `**Channels** : ${Bot.discord.client.channels.size}`,
                    `**Active Polls** : ${Bot.activePolls || 0}`,
                    ``,
                    `**Memory Usage**`,
                    mem.join("\n")
                    
                ],
                inline: true
            },{
                name: `**== Bot options ================**`,
                value: Object.keys(clientOptions).map(o => {
                    return `**${o}** : ${clientOptions[o]}`
                }),
                inline: true
            }]
        }
    }

}
