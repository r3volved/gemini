//When added to new server, create new config in db
module.exports = async ( monitor ) => {

    await new Promise((resolve, reject) => {

        let config = {
            server:monitor.eventParams.server.id,
            action:[],
            roles:[],
            dm:[],
            ownerId:monitor.eventParams.server.ownerId
        }

        let sql = "INSERT OR IGNORE INTO servers VALUES ( ?, ?, ?, ?, ? )"
        let params = [
            config.server,
            JSON.stringify(config.action),
            JSON.stringify(config.roles),
            JSON.stringify(config.dm),
            JSON.stringify(config.ownerId)
        ]

        Bot.db.run(sql, params, (err, row) => {
            if( err ) reject(err)
            resolve(config)
        })
                
    }).catch(Report.error)
    
}
