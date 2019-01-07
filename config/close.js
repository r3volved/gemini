const close = ( code ) => {

    Report.info( `GEMINI: Recieved kill code ${code}` )

    if( Bot.discord && Bot.discord.close ) {
        try { 
            Bot.discord.close()
            Report.info( `GEMINI: Connection to discord has been terminated` )
        } catch(e) {
            Report.info( `GEMINI: Error disconnecting from discord` )
            Report.error( e )
            process.exit(1)
        }
    }
    
    process.exit(0)

}
//Highjack SIGTERM and SIGINT with this function
process.on('SIGTERM', close)
process.on('SIGINT',  close)
module.exports = close
