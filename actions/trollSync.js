//Resync all confirmed and suspected id's from home-channels
module.exports = async ( monitor ) => {

    Bot.trolls = {
        confirmed:[],
        suspected:[]
    }

    await new Promise(res => {
        let confirmedSrc = Bot.discord.client.channels.get( Bot.config.confirmed )
        confirmedSrc.fetchMessages()
            .then(msgs => {
                msgs.forEach( m => {
                    let id = m.content.split(" ")[0].replace(/\`/g,"")
                    if( !Bot.trolls.confirmed.find(t => t === id) ) Bot.trolls.confirmed.push(id)
                })
                res()
            }).catch(Report.error)
    })

    await new Promise(res => {
        let suspectedSrc = Bot.discord.client.channels.get( Bot.config.suspected )
        suspectedSrc.fetchMessages()
            .then(msgs => {
                msgs.forEach( m => {
                    let id = m.content.split(" ")[0].replace(/\`/g,"")
                    if( !Bot.trolls.suspected.find(t => t === id) ) Bot.trolls.suspected.push(id)
                })
                res()
            }).catch(Report.error)
        
    })

    monitor.actioned.push({action:"trollSync", result:true})
    
    monitor.response = {
        embed: { 
            title:"Troll Trace - Data Sync", 
            description:[
                "Total confirmed trolls: "+Bot.trolls.confirmed.length,
                "Total suspected trolls: "+Bot.trolls.suspected.length
            ]
        }
    }
}
