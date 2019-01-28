//Watch for duplicate usernames of home members
module.exports = async ( monitor ) => {
    
    if( !monitor.monthis ) return 
    if( !monitor.eventParams.member || !monitor.eventParams.member.user || !monitor.eventParams.member.user.id ) {
        Report.error(monitor.eventParams)
        return
    }
    if( Bot.trolls.confirmed.includes( monitor.eventParams.member.user.id ) ) return

    try {
    
        let home = Bot.discord.client.guilds.get(Bot.config.home)
        await home.fetchMembers()
        
        let homeMembers = home.members.array()
        
        let dupname     = monitor.eventParams.member.user.tag.split("#")[0].toLowerCase()
        let duphash     = monitor.eventParams.member.user.tag.split("#")[1]
        let duplicates  = homeMembers.filter(m => {
            return m.user.tag.split("#")[0].toLowerCase() === dupname && m.user.tag.split("#")[1] !== duphash
        })
        
        if( duplicates.length ) {
            Bot.discord.client.channels.get(Bot.config.confirmed).send(monitor.eventParams.member.user.id+" : "+monitor.eventParams.member.user.tag)
            monitor.actioned.push({action:"trollWatchDuplicateUsers", result:true})
        }
                                           
    } catch(e) {
        Report.error(e)
    }
    
}
