//Report the servers that the client exists in
module.exports = async ( monitor ) => {

    let regions = Bot.discord.client.guilds.reduce((reg,g) => {
        reg[g.region] = reg[g.region] || []
        reg[g.region].push( g )
        return reg
    },{})

    monitor.response = {
        embed:{
            title: `**${Bot.discord.client.user.username} servers**`,
            description: `${Bot.discord.client.user.username} is in **${Bot.discord.client.guilds.size}** servers across **${Object.keys(regions).length}** regions`,
            fields: []
        }
    }
    
    
    let guilds = Bot.discord.client.guilds.array()
    while( guilds.length > 0 ) {
        monitor.response.embed.fields.push({
            name:monitor.response.embed.fields.length + 1,
            value:guilds.splice(0,20).map(g => {
                return `\`${g.id}\` : ${g.name}`
            })
        })
        if( monitor.response.embed.fields.length === 20 ) break
    }

}
