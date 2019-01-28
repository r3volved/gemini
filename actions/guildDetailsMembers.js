//Report the channels and permissions of channels for a specified guild by guildid
module.exports = async ( monitor ) => {

    const id = monitor.eventParams.message.content.split(/\s+/).find(c => c.match(/^\d{17,18}$/))
    const guild = id
        ? Bot.discord.client.guilds.get(id)
        : monitor.eventParams.message.guild
    
    if( !guild ) {
        monitor.response = { content:"I do not have access to the guild you have requested" }
        return
    }
    
    await guild.fetchMembers()
    
    const members = guild.members.array()
        
    monitor.response = {
        embed:{
            title: `**I found ${members.size} members in ${guild.name}**`,
            description: `*Showing max 80*`,
            fields: []
        }
    }
    
    
    //add 4 fields (200 members)
    for( let i = 0; i < 4; ++i ) {    
        if( !members.length ) break
        monitor.response.embed.fields.push({
            name:"--",
            value:members.splice(0,20).map(mem => {
                return mem.displayName+" : "+mem.user.id                
            })
        })
    }
}
