module.exports = async ( monitor ) => {

    const reactions = ["\u0030\u20E3","\u0031\u20E3","\u0032\u20E3","\u0033\u20E3","\u0034\u20E3","\u0035\u20E3", "\u0036\u20E3","\u0037\u20E3","\u0038\u20E3","\u0039\u20E3"]
    const reactLog = reactions.map(r => 0)
    
    const Discord = require('discord.js')
    let resultCollector = new Discord.ReactionCollector(monitor.replied, ( args, collection ) => {        
        
        let indx = reactions.indexOf( args._emoji.name )        
        if( indx > -1 ) {
            reactLog[indx]++
            return true
        } else {
            return false
        }
        
    },{})


    let ocount = 0
    for( let o of monitor.poll.o ) {
        await monitor.replied.react(reactions[++ocount])
    }
        
    
    //5 minute timeout
    let pollTimeout = setTimeout(() => {
        
        resultCollector.stop()
        
        let count = 0
        let embed = {
            title:monitor.poll.q,
            description:monitor.poll.o.map(o => {
                return "**("+(reactLog[++count] -1)+")** : "+o.trim()
            }).join("\n")
        }
        
        monitor.replied.channel.send("<@"+monitor.eventParams.author.id+">, your poll has ended.\nHere are the results:", {embed})
        .then( msg => {
            monitor.replied.delete()
        })
            
        resultCollector = null
        clearTimeout(pollTimeout)
        
    }, 5*60000)    
        
}
