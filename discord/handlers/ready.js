//Emitted when the client becomes ready to start working
module.exports = async () => {
	
    Report.info(`GEMINI...Initializing presence`)

	let presence = await Bot.discord.client.user.setActivity( 'help me gemini', { type: 'LISTENING' } )

    //CONSOLE START-UP REPORT 
    Report.info("=".repeat(60))
    Report.info(`GEMINI : Discord connected`)
    Report.info(`GEMINI : Logged in as ${Bot.discord.client.user.tag} : ${Bot.discord.client.user.id}`)
    Report.info(`GEMINI : Presence set to \"${presence.game ? presence.game.name : 'none'}\"`)
    
    Bot.discord.id = Bot.discord.client.user.id            

}
