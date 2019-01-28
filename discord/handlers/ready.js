//Emitted when the client becomes ready to start working
module.exports = async () => {

    let presence = null
    if( Bot.config.presence ) {
        Report.info(`GEMINI...Initializing presence`)

	    presence = await Bot.discord.client.user.setActivity( Bot.config.presence, { type: 'LISTENING' } )
    }
    
    //CONSOLE START-UP REPORT 
    Report.info("=".repeat(60))
    Report.info(`GEMINI : Discord connected`)
    Report.info(`GEMINI : Logged in as ${Bot.discord.client.user.tag} : ${Bot.discord.client.user.id}`)
    
    if( presence ) {
        Report.info(`GEMINI : Presence set to \"${presence.game ? presence.game.name : 'none'}\"`)
    }
    
    Bot.discord.id = Bot.discord.client.user.id            

    Bot.monitors
        .filter(m => m.event.includes("ready"))
        .forEach(async m => {
            //Copy monitor so it can mutate through process
            let monitor = Object.assign({},m)

            try {

                //Will perform all module.actions in series 
                //Each result appended to module.actioned
                await Bot.discord.actions( monitor )
                
                //Report actions performed (for dev/debug)
                Report.dev( "GEMINI : Loaded => ", monitor.filename )        
                
            } catch(e) {
                Report.error("GEMINI : ready : Loading error", e)
            }            
        
        })

}
