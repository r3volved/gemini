//Monitor new members for new accounts
module.exports = async ( monitor ) => {

    if( !monitor.eventParams.member || !monitor.eventParams.member.user || !monitor.eventParams.member.user.id ) {
        //console.log( member )
        return
    }
    if( Bot.trolls.confirmed.includes( monitor.eventParams.member.user.id ) ) return    

    let member = monitor.eventParams.member
    let server = monitor.eventParams.server
    
    let created = new Date( member.user.createdTimestamp )
    let today   = new Date()
    
    //48-hours
    let threshold = 1000*60*60*24*2    
    if( today.getTime() - created.getTime() < threshold ) {
    
        monitor.newAccount = true
        monitor.monthis = true
        monitor.logthis = true
        
    }

}
