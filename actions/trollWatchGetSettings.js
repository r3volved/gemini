//Get server troll settings
module.exports = async ( monitor ) => {
    
    if( !monitor.eventParams.server ) {
        console.log( monitor )
    } 
    await new Promise(end => {
            
        new Promise((resolve, reject) => {

            let sql = "SELECT * FROM servers WHERE id = ?"
            Bot.db.get(sql, [monitor.eventParams.server.id], (err, row) => {
                if( err ) reject(err)
                resolve(row)
            })

        }).then(row => {

            let description = null
            
            if( row ) {

                monitor.serverConfig = {
                    server:row ? row.id : null,
                    action:row ? row.action : null,
                    roles:row ? row.roles : null,
                    dm:row ? row.dm : null,
                    ownerId:row ? row.ownerId : monitor.eventParams.server.ownerId,
                }

                try {
                    monitor.serverConfig.action = monitor.serverConfig.action && monitor.serverConfig.action.length ? JSON.parse(monitor.serverConfig.action) : []
                    monitor.serverConfig.action = monitor.serverConfig.action && monitor.serverConfig.action.length ? monitor.serverConfig.action : []
                } catch(e) { Report.error(e) }
                
                try {
                    monitor.serverConfig.roles = monitor.serverConfig.roles && monitor.serverConfig.roles.length ? JSON.parse(monitor.serverConfig.roles) : []
                    monitor.serverConfig.roles = monitor.serverConfig.roles && monitor.serverConfig.roles.length ? monitor.serverConfig.roles : []
                } catch(e) { Report.error(e) }

                try {
                    monitor.serverConfig.dm = monitor.serverConfig.dm && monitor.serverConfig.dm.length ? JSON.parse(monitor.serverConfig.dm) : []
                    monitor.serverConfig.dm = monitor.serverConfig.dm && monitor.serverConfig.dm.length ? monitor.serverConfig.dm : []
                } catch(e) { Report.error(e) }

            }

            end()
                
        }).catch(e => {
            
            Report.error(e)
            end()
                       
        })

    })    
}
