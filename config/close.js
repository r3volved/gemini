const close = ( code ) => {

    Report.info( `GEMINI: Recieved kill code ${code}` )
    
    let errors = []

    if( Bot.discord && Bot.discord.close ) {
        try { 
            Bot.discord.close()
            Report.info( `GEMINI: Connection to discord has been terminated` )
        } catch(e) {
            Report.info( `GEMINI: Error disconnecting from discord` )
            Report.error( e )
            errors.push( e )
        }
    }
    
    if( Bot.db && Bot.db.close ) {
        try { 
            Bot.db.close()
            Report.info( `GEMINI: Connection to database has been terminated` )
        } catch(e) {
            Report.info( `GEMINI: Error disconnecting from database` )
            Report.error( e )
            errors.push( e )
        }
    }
    
    if( Bot.logs && Bot.logs.close ) {
        try { 
            Bot.logs.close()
            Report.info( `GEMINI: Connection to logs has been terminated` )
        } catch(e) {
            Report.info( `GEMINI: Error disconnecting from logs` )
            Report.error( e )
            errors.push( e )
        }
    }
    
    process.exit(errors.length)

}
//Highjack SIGTERM and SIGINT with this function
process.on('SIGTERM', close)
process.on('SIGINT',  close)
module.exports = close
