//Connect to troll-logs database
module.exports = async ( monitor ) => {

    Bot.sql = Bot.sql || require('sqlite3')
    
    //Connect to DB
    await new Promise(res => {
        Bot.logs = new Bot.sql.Database(process.cwd()+'/data/troll-logs.db', Bot.sql.OPEN_READWRITE, (err) => {
            if( err ) Report.error(err)
            else Report.info("GEMINI : Connected to troll logs db")
            res()
        })
    })
    
}
