//Report the role details for a specified guild by guildid
module.exports = async ( monitor ) => {

    const id = monitor.eventParams.message.content.split(/\s+/).find(c => c.match(/^\d{17,18}$/))
    const guild = id
        ? Bot.discord.client.guilds.get(id)
        : monitor.eventParams.message.guild
    
    if( !guild ) {
        monitor.response = { content:"I do not have access to the guild you have requested" }
        return
    }
    
    const roles = guild.roles.sort((a,b) => b.members.size - a.members.size)
    
    monitor.response = {
        embed:{
            title: `**I found ${roles.size} roles in ${guild.name}**`,
            description: roles.map(r => {
                let mentionable = r.mentionable ? "🔔" : "🔕"
                return `${mentionable} : ${r.name} : \`${r.permissions}\``
            })
        }
    }

}
