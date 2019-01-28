//Report list of confirmed trolls
module.exports = async ( monitor ) => {

    Bot.trolls = Bot.trolls || { confirmed:[] }
    
    monitor.response = {
        embed: { 
            title:"Troll Trace - Confirmed Trolls", 
            description:Bot.trolls.confirmed.map(t => "`"+t+"` <@"+t+">")
        }
    }

}
