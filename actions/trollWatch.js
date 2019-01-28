//WATCH JOIN OR MESSAGE FOR TROLL ID

module.exports = async ( monitor ) => {

    let confirmed = false
    let suspected = false
    let member = monitor.eventParams.member
    
    if( !member || !member.user || !member.user.id ) {
        //console.log( member )
        return
    }

    //Is member confirmed troll
    if( Bot.trolls.confirmed.includes( member.user.id ) ) confirmed = true

    //Is member suspected troll
    if( Bot.trolls.suspected.includes( member.user.id ) ) suspected = true
    
    //If neither, skip
    if( !confirmed && !suspected ) return
      
        
    //...otherwise
        
    //Do actions from server config
    let actioned = []
    let msgType = "Warning"

    const server = member.guild

    //Ensure user still exists in guild at this point
    if( !server.members.get(member.user.id) ) return

    const channel = monitor.eventParams.message
        ? monitor.eventParams.message.channel
        : member.guild.systemChannel

    let home = Bot.discord.client.guilds.find(g => g.id === Bot.config.home)
    let alreadyActioned = false
    
    
    if( confirmed && monitor.serverConfig && monitor.serverConfig.action ) {
                    
        for( let action of monitor.serverConfig.action ) {
            
            switch( action ) {                

                //Try ban user
                case "ban":
                    try {
                        await member.ban({days:1,reason:"Your account has been flagged for trolling"})
                        actioned.push({action:"ban",result:"This user has been banned"})
                        msgType = "Notification"
                    } catch(e) {
                        actioned.push({action:"ban",result:"Failed to ban this user\n"+e.message})
                    }
                    break
                    
                //Try kick user
                case "kick":
                    try {
                        await member.kick("Your account has been flagged for trolling")
                        actioned.push({action:"kick",result:"This user has been kicked"})
                        msgType = "Notification"
                    } catch(e) {
                        actioned.push({action:"kick",result:"Failed to kick this user\n"+e.message})
                    }                    
                    break
                    
                //Try add roles to user
                case "role":
                    try {
                        let roles = monitor.serverConfig.roles
                        if( !roles ) throw new Error("No roles specified to add")
                        
                        roles = server.roles.filter(r => roles.includes(r.name.toLowerCase()))

                        if( member.roles.find(r => roles.get(r.id)) ) alreadyActioned = true
                        
                        if( !alreadyActioned ) {
                            try { 
                                await member.removeRoles(member.roles)
                                await member.addRoles(roles) 
                            }
                            catch(e) { Report.error(e) }

                            actioned.push({action:"role",result:"This user has been given roles: "+roles.map(r => r.name).join(", ")})
                            msgType = "Notification"
                        }
                    } catch(e) {
                        actioned.push({action:"role",result:"Failed to add roles to user\n"+e.message})
                    }                    
                    break
                    
                //Try notification to message channel (if message) or system channel (if not message)
                case "notify":
                    if( !alreadyActioned ) {
                        let embed = {
                            title:`Troll Trace - ${msgType}`,
                            description:[
                                "<@"+member.user.id+"> is a confirmed troll and has been actioned upon",
                                "`"+"-".repeat(30)+"`",
                                "Server ID: "+server.id,
                                "Channel ID: "+(monitor.eventParams.message && monitor.eventParams.message.channel ? monitor.eventParams.message.channel.id : "Server-join"),
                                "User ID: "+member.user.id,
                                "Message ID: "+(monitor.eventParams.message ? monitor.eventParams.message.id : "Server-join"),
                                "`"+"-".repeat(30)+"`",
                            ].join("\n"),
                            fields:[{
                                name:"Actions",
                                value:actioned.map(a => {
                                    return "**Action** : "+a.action+"\n**Result** : "+a.result
                                }).join("\n"),
                                inline:false
                            }]
                        }
                        try {
                            if( monitor.serverConfig.dm.length ) {
                                server.members
                                    .filter(m => monitor.serverConfig.dm.includes( m.id ))
                                    .forEach(m => {
                                        m.send({embed})
                                        if( actioned.find(a => a.action === "notify") ) {
                                            actioned.find(a => a.action === "notify").result += m.nickname+" has been dm'd\n"
                                        } else {
                                            actioned.push({action:"notify",result:m.nickname+" has been dm'd\n"})
                                        }
                                    })
                            } else {
                                await channel.send({embed})
                                actioned.push({action:"notify",result:"Server has been notified"})
                            }
                        } catch(e) {
                            actioned.push({action:"notify",result:"Failed to notify server administration\n"+e.message})
                        }
                    }
                    break
                        
                default:
                        
            }
        }
        
        if( !alreadyActioned || !home.roles.get("535120667461419035").members.get(member.id) ) { 
            try {
                await member.send("Your account has been flagged for spamming/trolling. To appeal this action, [please visit us](https://discord.gg/TwN6rhq)")
                actioned.push({action:"warn",result:"This user has been warned with a DM for appeal"})
            } catch(e) {
                Report.error(e.message)
            }
        }
        
    }

    monitor.actioned = monitor.actioned.concat(actioned)

    if( confirmed && !alreadyActioned ) {

        //Try report back to home-base notifications channel
        let embed = {
            title:`Troll Trace - Activity Monitor`,
            description:[
                "**"+member.user.tag+" : "+(member.displayName || member.username)+"**",
                "`"+"-".repeat(30)+"`",
                "<@"+member.user.id+"> is active on "+server.name,
                "`"+"-".repeat(30)+"`",
                "Server ID: "+server.id,
                "Channel ID: "+(monitor.eventParams.message && monitor.eventParams.message.channel ? monitor.eventParams.message.channel.id : "Server-join"),
                "User ID: "+member.user.id,
                "Message ID: "+(monitor.eventParams.message ? monitor.eventParams.message.id : "Server-join"),
                "`"+"-".repeat(30)+"`",
            ].join("\n"),
            fields:[{
                name:"Actions",
                value:actioned.map(a => {
                    return "**Action** : "+a.action+"\n**Result** : "+a.result
                }).join("\n"),
                inline:false
            }]
        }
        Bot.discord.client.channels.get(Bot.config.notifications).send({embed})

    }  
    
}
