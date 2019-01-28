//Notify home-channel of activity and actions
module.exports = async ( monitor ) => {

    if( !monitor.logthis ) return
    
    let member = monitor.eventParams.member
    let server = monitor.eventParams.server

    //Try report back to home-base notifications channel
    let embed = {
        title:`Troll Trace - Activity Monitor`,
        description:[
            "**"+member.user.tag+" : "+(member.displayName || member.username)+"**",
            "`"+"-".repeat(30)+"`"
        ]
    }

    let channel = Bot.config.notifications
    
    if( monitor.newAccount ) {
        embed.description.push("<@"+member.user.id+"> is less than 48-hours old")
        embed.description.push("Account created on "+(new Date( member.user.createdTimestamp )).toLocaleString())
        embed.color = 7578437
        channel = Bot.config.suspectNotifications
    } 

    if( monitor.suspected ) {
        embed.description.push("<@"+member.user.id+"> is a suspected troll account")
        embed.description.push("Account created on "+(new Date( member.user.createdTimestamp )).toLocaleString())
        embed.color = 11367218
        channel = Bot.config.suspectNotifications
    }

    if( monitor.confirmed ) {
        embed.description.push("<@"+member.user.id+"> is a confirmed troll account")
        embed.description.push("Account created on "+(new Date( member.user.createdTimestamp )).toLocaleString())
        embed.color = 13500444
        channel = Bot.config.notifications
    } 
    

    if( monitor.eventParams.message ) {
        embed.description.push("User has just messaged in "+monitor.eventParams.message.guild.name)
        embed.description.push("`"+"-".repeat(30)+"`")
        embed.description.push("Server ID: "+monitor.eventParams.message.guild.id)
        embed.description.push("Channel ID: "+monitor.eventParams.message.channel.id)
        embed.description.push("User ID: "+monitor.eventParams.message.author.id)
        embed.description.push("Message ID: "+monitor.eventParams.message.id)
        embed.description.push("`"+"-".repeat(30)+"`")
        embed.fields = [{
            name:"Message",
            value:monitor.eventParams.message.content || JSON.stringify(monitor.eventParams.message.image)
        }]
    } else {
        embed.description.push("User has just joined "+server.name)
        embed.description.push("`"+"-".repeat(30)+"`")
        embed.description.push("Server ID: "+server.id)
        embed.description.push("Channel ID: Server-join")
        embed.description.push("User ID: "+member.user.id)
        embed.description.push("Message ID: Server-join")
        embed.description.push("`"+"-".repeat(30)+"`")
    }

    embed.description = embed.description.join("\n")
    
    if( monitor.newAccount || monitor.confirmed || monitor.suspected ) {
        Bot.discord.client.guilds.get(Bot.config.home).channels.get(channel).send({embed})
        monitor.actioned.push({action:"trollWatchEventNotify", result:true})
    }        

    monitor.save = true
    
}
