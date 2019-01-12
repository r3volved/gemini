module.exports = async ( monitor ) => {

    Bot.activePolls = Bot.activePolls || 0
    Bot.activePolls++
    
    const reactions = ["\u0030\u20E3","\u0031\u20E3","\u0032\u20E3","\u0033\u20E3","\u0034\u20E3","\u0035\u20E3", "\u0036\u20E3","\u0037\u20E3","\u0038\u20E3","\u0039\u20E3"]
    
    let lines = monitor.eventParams.message.content.split("\n")
    
    let interval = Number(lines[0].split(/\s+/)[1])
    let unit = !interval 
        ? "minute"
        : lines[0].split(/\s+/)[2].toLowerCase().startsWith("d") 
            ? "day"
            : lines[0].split(/\s+/)[2].toLowerCase().startsWith("h")
                ? "hour"
                : "minute"
    
    interval = interval || 5
    
    let time = (() => {
        switch(unit) {
            case "day":  return interval*24*60*60*1000
            case "hour": return interval*60*60*1000
            default:     return interval*60*1000
        }
    })()

    monitor.poll = {
        t:time,
        q:lines[1],
        o:lines.slice(2)
    }
    
    let count = 0
    let description = monitor.poll.o.map(o => {
        return reactions[++count]+" : **"+o.trim()+"**"
    }).join("\n")
    
    monitor.response = {
        content:[
            "**{@author}, has started a "+interval+" "+unit+" poll**"
        ],
        embed:{
            author:{
                name: monitor.eventParams.message.author.username,
                icon_url: monitor.eventParams.message.author.displayAvatarURL
            },
            title:"**"+monitor.poll.q+"**",
            description:[
                "`------------------------------`",
                description,
                "`------------------------------`",
                "`Vote with the reactions below`"
            ]
        }
    }
    
        
}
