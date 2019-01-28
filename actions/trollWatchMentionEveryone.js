//Monitor new user message for an @everyone
module.exports = async ( monitor ) => {
    
    if( !monitor.monthis ) return 
    if( !monitor.eventParams.message ) return
    if( Bot.trolls.confirmed.includes( monitor.eventParams.message.author.id ) ) return

    try {
        
        //if new user uses @everyone right away - confirm them
        if( monitor.eventParams.message.mentions.everyone ) {
            Bot.discord.client.channels.get(Bot.config.confirmed).send(monitor.eventParams.message.author.id+" : "+monitor.eventParams.message.author.tag)
            monitor.actioned.push({action:"trollWatchMentionEveryone", result:true})
        }
    
    } catch(e) {
        Report.error(e)
    }
    
}
