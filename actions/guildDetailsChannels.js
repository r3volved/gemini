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
    
    const channels = guild.channels
    const categories = channels.reduce((list,channel) => {
        
        let name     = channel.parent ? channel.parent.name : "None"
        let position = channel.parent ? channel.parent.calculatedPosition : -1
        
        list[name] = list[name] || {
            name:     name,
            position: position,
            channels: []
        }

        list[name].channels.push(channel)
        
        return list
    
    },{})
    
    let catKeys = Object.keys(categories)
    catKeys.sort((a,b) => categories[a].position - categories[b].position)
    
    monitor.response = {
        embed:{
            title: `**I found ${channels.size} channels in ${guild.name}**`,
            description: `*Organized across ${catKeys.length} categories*`,
            fields: catKeys.map(cat => {
                categories[cat].channels.sort((a,b) => a.calculatedPosition - b.calculatedPosition)
                return {
                    name: `**${categories[cat].name}**`,
                    value: categories[cat].channels.map(c => {
                        let manageable = c.manageable ? "👮" : "👤"
                        return `${manageable} : \`${c.id}\` : ${c.name}`
                    })                
                }
            })
        }
    }

}
