//Emitted whenever a guild is deleted/left
module.exports = async ( guild ) => {

    Bot.monitors
        .filter(m => m.event && m.event.includes("guildDelete"))
        .forEach(async m => {

            //Copy monitor so it can mutate through process
            let monitor = Object.assign({},m)

            try {

                //Attach event params
                monitor.paramRef = {guild:guild}
                monitor.eventParams = { 
                    author  : Bot.discord.client.user,
                    channel : guild.channels.get(guild.systemChannelID),
                    member  : Bot.discord.client.user,
                    server  : guild
                }

                //Create action result container
                monitor.actioned = []
                
                let proceed = Bot.discord.validate( monitor )
                if( !proceed ) return
                
                let triggered = Bot.discord.triggers( monitor )
                if( !triggered ) return


                //Will perform all module.actions in series 
                //Each result appended to module.actioned
                await Bot.discord.actions( monitor )
                
                //Report actions performed (for dev/debug)
                if( monitor.actioned.length ) {
                    Report.dev( "GEMINI : Routed => ", monitor.filename+" => ", monitor.actioned.map(r => r.action) )
                }
                
            } catch(e) {
                Report.error("GEMINI : guildDelete : Routing error", e)
            }

        })
    
    return

}
