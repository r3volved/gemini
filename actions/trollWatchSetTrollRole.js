//Toggle role array
module.exports = async ( monitor ) => {

    if( !monitor.serverConfig ) return
    
    const roleNames = monitor.eventParams.message.content.split(/\s+/).slice(3).join(" ").toLowerCase().split(/\s*,\s*/)
    if( !roleNames.length ) return monitor.eventParams.message.reply("Please provide one or more role names, separated by comma")

    const roles = monitor.eventParams.message.guild.roles.filter(r => roleNames.includes(r.name.toLowerCase()))
    if( !roles.size ) return monitor.eventParams.message.reply("I could not find these roles")
    if( roles.size < roleNames.length ) return monitor.eventParams.message.reply("I could not find all of the roles you specified")

    await new Promise((res, rej) => {

        monitor.serverConfig.roles = roleNames

        let sql = "INSERT INTO servers VALUES ( ?, ?, ?, ?, ? ) ON CONFLICT(id) DO UPDATE SET roles=?"
        let params = [
            monitor.serverConfig.server,
            JSON.stringify(monitor.serverConfig.action),
            JSON.stringify(monitor.serverConfig.roles),
            JSON.stringify(monitor.serverConfig.dm),
            JSON.stringify(monitor.serverConfig.ownerId),
            JSON.stringify(monitor.serverConfig.roles)
        ]

        Bot.db.run(sql, params, (err, row) => {
            if( err ) rej(err)
            res()
        })

    }).catch(Report.error)
    
}
