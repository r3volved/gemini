//Monitor new members for new accounts
module.exports = async ( monitor ) => {
    
    if( !monitor.eventParams.member || !monitor.eventParams.member.user || !monitor.eventParams.member.user.id ) {
        return
    }

    if( Bot.trolls.confirmed.includes( monitor.eventParams.member.user.id ) ) return    

    if( Bot.trolls.suspected.includes( monitor.eventParams.member.user.id ) ) {
    
        monitor.monthis = true
        monitor.logthis = true
        monitor.suspected = true
        monitor.actioned.push({action:"trollWatchSuspected", result:true})
        
    }    
    
}
