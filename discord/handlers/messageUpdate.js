//Emitted whenever a message is updated - e.g. embed or content change
module.exports = async ( oldMessage, newMessage ) => {

    Bot.monitors
        .filter(m => m.event && m.event === "messageUpdate")
        .forEach(async m => {

            //Copy monitor so it can mutate through process
            let monitor = Object.assign({},m)

            //Attach event params
            monitor.eventParams = { 
                oldMessage : oldMessage,
                message : newMessage,
                author  : newMessage.author,
                member  : newMessage.member,
                channel : newMessage.channel,
                server  : newMessage.channel.guild
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
                Report.error("GEMINI : messageUpdate : Routing error", e)
            }

        })
    
    return
    
}
