//Toggle dm array
module.exports = async ( monitor ) => {

    if( !monitor.serverConfig ) return
    
    const users = monitor.eventParams.message.mentions.members
    if( !users.size ) return monitor.eventParams.message.reply("Please provide one or more user mentions to receive DM's when trolls are actioned")

    await new Promise((res, rej) => {

        monitor.serverConfig.dm = users.map(u => u.user.id)

        let sql = "INSERT INTO servers VALUES ( ?, ?, ?, ?, ? ) ON CONFLICT(id) DO UPDATE SET dm=?"
        let params = [
            monitor.serverConfig.server,
            JSON.stringify(monitor.serverConfig.action),
            JSON.stringify(monitor.serverConfig.roles),
            JSON.stringify(monitor.serverConfig.dm),
            JSON.stringify(monitor.serverConfig.ownerId),
            JSON.stringify(monitor.serverConfig.dm)
        ]

        Bot.db.run(sql, params, (err, row) => {
            if( err ) rej(err)
            res()
        })

    }).catch(Report.error)
    
}
