module.exports = async ( monitor ) => {

    if( monitor.eventParams.author.bot ) {
        monitor.response.embed.title = "Warning !! {member} is a wild bot"
        try {
            let botRoles = monitor.eventParams.server.roles.filter(r => monitor.roles.includes( r.name.toLowerCase() ))
            if( botRoles.length ) {
                monitor.actions.push({ action:"wildBot", result:monitor.eventParams.member.addRoles(botRoles) })
                monitor.response.embed.description.push("Bot has been quarantined - see user "+monitor.eventParams.member.user.tag)
            } else {
                monitor.response.embed.description.push("Unable to quarantine - see user "+monitor.eventParams.member.user.tag)
                monitor.response.embed.description.push("Quarantine role \"bot\" does not exist")
            }
        } catch(e) {
            monitor.response.embed.description.push("Failed to quarantine - see user "+monitor.eventParams.member.user.tag)
            monitor.response.embed.description.push(e.description)
        }
    } else {
        delete monitor.response
        monitor.actions.push({ action:"wildBot", result:false })
    }
    
    return

}
