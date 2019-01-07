const config = require("./config.json")
const env = config.debug ? "development" : 'production'

/** ===== Init console reporting ===== **/

global.Report = {
    info  : console.info,
    error : console.error,
    log   : env !== 'development' ? console.log : () => {},
    dev   : env === 'development' ? console.log : () => {},
}

/** ===== Init bot core ===== **/

global.Bot = {
    //Config stuff
    root    : __dirname,
    env     : env,
    app     : require("./package.json"),
    config  : config,
    discord : require("./discord"),
    monitors: [],
    actions : {},
    //Instance handlers
    open    : require("./config/open.js"),
    close   : require("./config/close.js"),
    reload  : require("./config/reload.js")
}

/** ===== Identify to console ===== **/

Report.info( "=".repeat(60) )
Report.info( `${Bot.app.name.toUpperCase()} core : @${Bot.app.version}` )
Report.info( `${Bot.app.description}` )
Report.info( "=".repeat(60) )

/** ===== Initialize startup sequence ===== **/

Bot.open()
