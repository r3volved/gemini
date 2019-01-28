//Log troll event to DB
module.exports = async ( monitor ) => {

    if( !monitor.save ) return
    
    let flags = []
    if( monitor.newAccount ) flags.push("newAccount")
    if( monitor.suspected )  flags.push("suspected")
    if( monitor.confirmed )  flags.push("confirmed")
    
    let log = [
        monitor.eventParams.member.user.id,
        monitor.eventParams.member.user.createdTimestamp,
        monitor.eventParams.member.user.tag,
        monitor.eventParams.member.user.username,
        monitor.eventParams.member.displayName,
        
        monitor.eventParams.server.id,
        (monitor.eventParams.message ? monitor.eventParams.message.channel.id : "Join Event"),
        (monitor.eventParams.message ? monitor.eventParams.message.id : "Join Event"),

        JSON.stringify(flags),
        (new Date()).getTime(),
        
        Bot.circularJSON( monitor.paramRef )
    ]

    await new Promise((resolve, reject) => {
    
        let sql = "INSERT INTO logs VALUES (?,?,?,?,?, ?,?,?, ?,?, ?)"
        Bot.logs.run(sql, log, (err, row) => {
            if( err ) reject(err)
            monitor.actioned.push({action:"trollWatchEventLogger", result:true})
            resolve()
        })
    
    }).catch(Report.error)

}


