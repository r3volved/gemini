//Emitted whenever a WebSocket resumes
module.exports = async ( replayed ) => {
    Report.error(`GEMINI : Discord connection resumed`)
    Report.error(replayed)
}

