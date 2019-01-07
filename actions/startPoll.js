module.exports = async ( monitor ) => {

    const reactions = ["\u0030\u20E3","\u0031\u20E3","\u0032\u20E3","\u0033\u20E3","\u0034\u20E3","\u0035\u20E3", "\u0036\u20E3","\u0037\u20E3","\u0038\u20E3","\u0039\u20E3"]
    
    const msgPcs = monitor.eventParams.message.content.split(" ").slice(2)
    const content = msgPcs.join(" ")

    monitor.poll = {
        q:content.split("?")[0]+"?",
        o:content.split("?")[1].split(",")
    }
    
    let count = 0
    monitor.response = {
        content:[
            "**{@author}, has started a poll**",
            "*This poll expires after 5 minutes*",
        ],
        embed:{
            title:monitor.poll.q,
            description:monitor.poll.o.map(o => {
                return reactions[++count]+" : **"+o.trim()+"**"
            }).join("\n")
        }
    }
    
        
}
