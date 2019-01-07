//Emitted whenever a message is created
module.exports = async ( message ) => {
    
    if( message.content === "GEMINISTATUS" ) {
        return message.reply([
            `I am GEMINI`,
            `Description: ${Bot.app.description}`,
            `Version: ${Bot.app.version}`,
            `Created by Shittybill`
        ].join("\n"))
    }
    
    Bot.monitors
        .filter(m => !m.event || m.event === "message")
        .forEach(async m => {

            //Copy monitor so it can mutate through process
            let monitor = Object.assign({},m)

            //Attach event params
            monitor.eventParams = { 
                message : message,
                author  : message.author,
                member  : message.member,
                channel : message.channel,
                server  : message.channel.guild
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
                    Report.dev( "Actions : ", monitor.actioned.map(r => r.action) )        
                }
                
            } catch(e) {
                Report.error("GEMINI : message : Routing error", e)
            }

        })
    
    return
    
}
