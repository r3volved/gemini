//Get server troll settings
module.exports = async ( monitor ) => {
    
    if( !monitor.monthis ) return 
    if( !monitor.eventParams.message ) return
    if( Bot.trolls.confirmed.includes( monitor.eventParams.message.author.id ) ) return

    try {
        
        //if more than 3 mentions
        if( monitor.eventParams.message.mentions.members.size + monitor.eventParams.message.mentions.users.size + monitor.eventParams.message.mentions.roles.size > 3 ) {
            Bot.discord.client.channels.get(Bot.config.confirmed).send(monitor.eventParams.message.author.id+" : "+monitor.eventParams.message.author.tag)
            monitor.actioned.push({action:"trollWatchMentions", result:true})
        }
    
    } catch(e) {
        Report.error(e)
    }
    
}
