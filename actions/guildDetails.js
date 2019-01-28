//Report the details of a specific guild by guildid
module.exports = async ( monitor ) => {

    const id = monitor.eventParams.message.content.split(/\s+/).find(c => c.match(/^\d{17,18}$/))
    const guild = id
        ? Bot.discord.client.guilds.get(id)
        : monitor.eventParams.message.guild
    
    if( !guild ) {
        monitor.response = { content:"I do not have access to the guild you have requested" }
        return
    }

    const owner = guild.owner

    monitor.response = {
        embed:{
            author:{
                name:guild.name,
                icon_url:guild.icon_URL
            },
            title:[
                guild.id,
                `Joined ${(new Date(guild.joinedTimestamp).toLocaleString())}`
            ],
            description:[
                `**Created** : ${(new Date(guild.createdTimestamp)).toLocaleString()}`,
                `**Region** : ${guild.region}`,
                `**Available** : ${guild.available}`,
                `**Channels** : ${guild.channels.size}`,
                `**Embed Enabled** : ${guild.embedEnabled}`,
                `**Content Filter** : ${guild.explicitContentFilter}`,
                `**Features** : ${guild.features.join(", ")}`,
                `**Members** : ${guild.memberCount}`,            
                `**Large** : ${guild.large}`
            ],
            fields:[{
                name:`Guild Owner`,
                value:[
                    `**ID** : ${owner.id}`,
                    `**Name** : ${owner.user.username}`,
                    `**Tag** : ${owner.user.tag}`
                ]
            }]
        }
    }

}
