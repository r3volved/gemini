module.exports = () => {
    return new Promise(res => {
        try {
            if( !Number(Bot.config.webUIPort) ) {
                Report.info("GEMINI : For WebUI, define a \"webUIPort\":<port> in config.json")
                return
            }

            const express = require('express')
            Bot.webui.server = express()

            Bot.webui.server.get("/", Bot.webui.handlers.home)
            
            Bot.webui.server.listen( Number(Bot.config.webUIPort), () => {
                Report.info("GEMINI : Loaded WebUI on http://localhost:"+Bot.config.webUIPort)
                res()
            })
        } catch(e) {
            res()
        }
    })
}
