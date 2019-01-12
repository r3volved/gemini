//Emitted whenever the client joins a guild
module.exports = async ( guild ) => {

    Bot.monitors
        .filter(m => m.event && m.event === "guildCreate")
        .forEach(async m => {

            //Copy monitor so it can mutate through process
            let monitor = Object.assign({},m)

            //Attach event params
            monitor.eventParams = { 
                author  : Bot.discord.client.user,
                channel : guild.systemChannel,
                member  : Bot.discord.client.user,
                server  : guild
            }

            //Create action result container
            monitor.actioned = []
            
            let proceed = Bot.discord.validate( monitor )
            if( !proceed ) return
            
            let triggered = Bot.discord.triggers( monitor )
            if( !triggered ) return

            try {

                //Will perform all module.actions in series 
                //Each result appended to module.actioned
                await Bot.discord.actions( monitor )
                
                //Report actions performed (for dev/debug)
                if( monitor.actioned.length ) {
                    Report.dev( "GEMINI : Routed => ", monitor.filename+" => ", monitor.actioned.map(r => r.action) )
                }
                
            } catch(e) {
                Report.error("GEMINI : guildCreate : Routing error", e)
            }

        })
    
    return


}
