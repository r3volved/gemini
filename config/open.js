module.exports = async () => {

    Report.info(`GEMINI...Starting in ${Bot.env} mode`)
    
    //If no config loaded, kill process
    if( !Bot.config ) {
        Report.error(`GEMINI : Unable to load config.json`)
        process.exit(0)
    }

    //If no discord token, kill process
    if( !Bot.config.token.length ) {
        Report.error(`GEMINI : Please provide a discord token in config`)
        process.exit(0)
    }
    
    Report.info(`GEMINI...Loading monitors and actions`)

    //Load monitors and actions
    await Bot.reload( {} )

    Report.info(`GEMINI : Loaded ${Bot.monitors.length} monitors`)
    Report.info(`GEMINI : Loaded ${Object.keys(Bot.actions).length} actions`)

    Report.info(`GEMINI...Connecting to Discord`)

    //Open discord connection
    Bot.discord.init()

    return true

}
