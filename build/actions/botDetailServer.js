module.exports = async ( monitor ) => {

    const id = monitor.eventParams.message.content.split(/\s+/).find(c => c.toString().match(/^\d{17,18}$/))
    const guild = Bot.discord.client.guilds.get(id)
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
