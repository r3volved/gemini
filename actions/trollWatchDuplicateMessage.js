//Get server troll settings
module.exports = async ( monitor ) => {
    
    if( !monitor.monthis ) return 
    if( !monitor.eventParams.message ) return 
    if( Bot.trolls.confirmed.includes( monitor.eventParams.message.author.id ) ) return
                
    await new Promise(end => {
            
        new Promise((resolve, reject) => {

            let sql = "SELECT * FROM logs WHERE userId = ? ORDER BY timestamp DESC limit 5"
            Bot.db.all(sql, [monitor.eventParams.message.author.id], (err, rows) => {
                if( err && err.length ) reject(err)
                resolve(rows)
            })

        }).then(rows => {

            //If last two out of last 5 messages match => confirm
            if( rows.length > 2 ) {
                try {
                
                    let duplicates = rows.filter(r => monitor.eventParams.message.content === JSON.parse(r.eventReference).message.content)
                    if( duplicates.length === rows.length ) {
                        Bot.discord.client.channels.get(Bot.config.confirmed).send(monitor.eventParams.message.author.id+" : "+monitor.eventParams.message.author.tag)
                        monitor.actioned.push({action:"trollWatchDuplicateMessage", result:true})
                    }
                                                       
                } catch(e) {
                    Report.error(e)
                }
            }
            
            end()
                
        }).catch(e => {
            
            Report.error(e)
            end()
                       
        })

    })
    
}
