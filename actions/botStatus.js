module.exports = async ( monitor ) => {

    const clientOptions = Bot.discord.client.options
    
    let monitorField = Bot.monitors.map(g => {
        return g.filename
    }).join("\n")+"\n"
    
    monitorField += Bot.failed && Bot.failed.monitors && Bot.failed.monitors.length 
        ? "**Failed to load**\n" + Bot.failed.monitors.join("\n")
        : ""
        
    let actionField = Object.keys(Bot.actions).join("\n")+"\n"
    
    actionField += Bot.failed && Bot.failed.actions && Bot.failed.actions.length 
        ? "**Failed to load**\n" + Bot.failed.actions.join("\n")
        : ""
    
    let mem = []
    const used = process.memoryUsage();
    for (let key in used) {
      mem.push(`${key} : ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
    }
      
    monitor.response = {
        embed:{
            title: `**${Bot.discord.client.user.username} status**`,
            description: [
                `**App Core** : ${Bot.app.name}`,
                `**App Version** : @${Bot.app.version}`,
                `**App Description** : ${Bot.app.description}`
            ],
            fields:[{
                name: `**Bot details**`,
                value: [
                    `**ID** : ${Bot.discord.client.user.id}`,
                    `**Tag** : ${Bot.discord.client.user.tag}`,
                    `**Ready** : ${(new Date(Bot.discord.client.readyTimestamp)).toLocaleString()}`,
                    `**Uptime** : ${(Bot.discord.client.uptime/60000).toFixed(2)} min`,
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
                name: `**Bot options**`,
                value: Object.keys(clientOptions).map(o => {
                    return `**${o}** : ${clientOptions[o]}`
                }),
                inline: true
            },{
                name: `**Actions**`,
                value: actionField,
                inline: true
            },{
                name: `**Monitors**`,
                value: monitorField,
                inline: true
            }]
        }
    }

}
