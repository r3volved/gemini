//Toggle auto-role
module.exports = async ( monitor ) => {

    if( !monitor.serverConfig ) return
    
    let toggle = monitor.eventParams.message.content.split(/\s+/).slice(3).join(" ")
        toggle = !toggle || toggle === 'on' ? true : false
            
    await new Promise((res, rej) => {

        monitor.serverConfig.action = monitor.serverConfig.action.filter(a => a === 'notify')
        if( toggle ) monitor.serverConfig.action = ["role"].concat(monitor.serverConfig.action)

        let sql = "INSERT INTO servers VALUES ( ?, ?, ?, ?, ? ) ON CONFLICT(id) DO UPDATE SET action=?"
        let params = [
            monitor.serverConfig.server,
            JSON.stringify(monitor.serverConfig.action),
            JSON.stringify(monitor.serverConfig.roles),
            JSON.stringify(monitor.serverConfig.dm),
            JSON.stringify(monitor.serverConfig.ownerId),
            JSON.stringify(monitor.serverConfig.action),
        ]

        Bot.db.run(sql, params, (err, row) => {
            if( err ) rej(err)
            res()
        })
        
    }).catch(Report.error)
    
}
