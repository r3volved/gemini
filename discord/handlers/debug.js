//Emitted for general debugging information
module.exports = async ( info ) => {

    if( Bot.config.debugDiscord ) Report.dev("GEMINI : Debug : ", info)

}
