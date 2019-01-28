//SCAN SERVER FOR KNOWN TROLLS


module.exports = async ( monitor ) => {

    const server = monitor.eventParams.server
    
    await server.fetchMembers()
    
    let confirmed = server.members.filter(m => Bot.trolls.confirmed.includes( m.user.id )).array()
    let suspected = server.members.filter(m => Bot.trolls.suspected.includes( m.user.id )).array()

    let actioned = []
    let msgType = "Warning"
    
    const channel = monitor.eventParams.message
        ? monitor.eventParams.message.channel
        : member.guild.systemChannel
    
    let home = Bot.discord.client.guilds.get(Bot.config.home)
    
    if( monitor.serverConfig && monitor.serverConfig.action ) {
        
        for( let member of confirmed ) {
            
            let alreadyActioned = false
            
            for( let action of monitor.serverConfig.action ) {
                
                switch( action ) {                

                    //Try ban user
                    case "ban":
                        try {
                            await member.ban({days:1,reason:"Your account has been flagged for trolling"})
                            actioned.push({action:"ban",result:member.displayName+" has been banned"})
                        } catch(e) {
                            actioned.push({action:"ban",result:"Failed to ban "+member.displayName+"\n"+e.message})
                        }
                        break
                        
                    //Try kick user
                    case "kick":
                        try {
                            await member.kick("Your account has been flagged for trolling")
                            actioned.push({action:"kick",result:member.displayName+" has been kicked\n"})
                        } catch(e) {
                            actioned.push({action:"kick",result:"Failed to kick "+member.displayName+"\n"+e.message})
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

                                actioned.push({action:"role",result:member.displayName+" has been given roles: "+roles.map(r => r.name).join(", ")})
                                msgType = "Notification"
                            }
                        } catch(e) {
                            actioned.push({action:"role",result:"Failed to add roles to "+member.displayName+"\n"+e.message})
                        }
                        break
                                                    
                    default:
                            
                }

            }

            if( !alreadyActioned || !home.roles.get("535120667461419035").members.get(member.id) ) { 
                try {
                    await member.send("Your account has been flagged for spamming/trolling. To appeal this action, [please visit us](https://discord.gg/TwN6rhq)")
                    actioned.push({action:"warn",result:member.displayName+" has been warned with a DM for appeal"})
                } catch(e) {
                    Report.error(e.message)
                }
            }
            
        }
        
    }

    monitor.actioned = monitor.actioned.concat(actioned)

    monitor.response = {
        embed:{
            title:`Troll Trace - Server Scan`,
            description:[
                "Found "+confirmed.length+" confirmed troll-accounts",
                "`"+"-".repeat(30)+"`",
                confirmed.map(m => m.displayName+" (`"+m.id+"`)").join(",\n"),
                "`"+"-".repeat(30)+"`",
                actioned.map(a => {
                    return "**Action** : "+a.action+"\n**Result** : "+a.result
                }).join("\n")
            ].join("\n")
        }
    }

    if( confirmed.length ) {
        
        //Try report back to home-base notifications channel
        let embed = {
            title:`Troll Trace - Server Scan`,
            description:[
                "Server scan found "+confirmed.length+" confirmed troll accounts were found on "+server.name,
                "`"+"-".repeat(30)+"`",
                confirmed.map(m => m.displayName+" (`"+m.id+"`)").join(",\n"),
                "`"+"-".repeat(30)+"`",
                actioned.map(a => {
                    return "**Action** : "+a.action+"\n**Result** : "+a.result
                }).join("\n")
            ].join("\n")
        }
        Bot.discord.client.channels.get(Bot.config.notifications).send({embed})

    } 
    
}
