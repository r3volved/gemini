//Report list of suspected trolls
module.exports = async ( monitor ) => {

    Bot.trolls = Bot.trolls || { suspected:[] }
    
    monitor.response = {
        embed: { 
            title:"Troll Trace - Suspected Trolls", 
            description:Bot.trolls.suspected.map(t => "`"+t+"` <@"+t+">")
        }
    }

}
