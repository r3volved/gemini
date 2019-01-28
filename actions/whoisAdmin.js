//Whois admin of guild by guild-id
module.exports = async ( monitor ) => {

    const id = monitor.eventParams.message.content.split(/\s+/).find(c => c.toString().match(/^\d{17,18}$/))
    const guild = Bot.discord.client.guilds.get(id)

    try {    
        await guild.fetchMembers()
        
        monitor.response = {
            embed:{
                title:["**Admins**", guild.name],
                description:guild.members.filter(m => m.hasPermission("ADMINISTRATOR")).map(m => m.user.tag+" : <@!"+m.user.id+">")
            }
        }
    } catch(e) {
        Report.error(e)
    }

}
