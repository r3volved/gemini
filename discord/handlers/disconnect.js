//Emitted when the client's WebSocket disconnects and will no longer attempt to reconnect
module.exports = async ( event ) => {
    Report.error(`GEMINI ! Discord error : Disconnected`)
    Report.error(event)

    //Either attempt to login again, or kill app
    if( event && event.code !== 4004 ) {
		Bot.discord.client.login( Bot.config.token )
	} else {        
	    process.emit('SIGINT')
	}
}

