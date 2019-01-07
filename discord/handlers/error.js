//Emitted whenever the client's WebSocket encounters a connection error
module.exports = async ( error ) => {
    Report.error(`GEMINI ! Discord error`)
    Report.error(error)
}

