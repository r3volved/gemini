//Connect to troll-configs database
//Load confirmed Id's from home-channel
//Load suspected Id's from home-channel

module.exports = async ( monitor ) => {

    Bot.sql = Bot.sql || require('sqlite3')
    Bot.trolls = {
        confirmed:[],
        suspected:[]
    }

    //Connect to DB
    await new Promise(res => {
        Bot.db = new Bot.sql.Database(process.cwd()+'/data/troll-configs.db', Bot.sql.OPEN_READWRITE, (err) => {
            if( err ) Report.error(err)
            else Report.info("GEMINI : Connected to troll configs db")
            res()
        })
    })
    
    //Load confirmed into mem
    await new Promise(res => {
        let confirmedSrc = Bot.discord.client.channels.get( Bot.config.confirmed )
        confirmedSrc.fetchMessages().then(msgs => {
            msgs.forEach( m => {
                let id = m.content.split(" ")[0].replace(/\`/g,"")
                if( !Bot.trolls.confirmed.find(t => t === id) ) Bot.trolls.confirmed.push(id)
            })
            res()
        }).catch(Report.error)
    })

    //Load suspected into mem
    await new Promise(res => {
        let suspectedSrc = Bot.discord.client.channels.get( Bot.config.suspected )
        suspectedSrc.fetchMessages().then(msgs => {
            msgs.forEach( m => {
                let id = m.content.split(" ")[0].replace(/\`/g,"")
                if( !Bot.trolls.suspected.find(t => t === id) ) Bot.trolls.suspected.push(id)
            })
            res()
        }).catch(Report.error)
    })

}
