module.exports = async ( monitor ) => {

    const toUnload = monitor.eventParams.message.content.split(" ").slice(2).join(" ")

    const found = Bot.monitors.find(m => m.filename === toUnload)
    console.log(found)
    if( !found ) return monitor.eventParams.message.reply([
        "I could not find monitor \""+toUnload+"\" ... monitoring:",
        "+ "+Bot.monitors.map(m => m.filename).join("\n+ ")
    ].join("\n"))
    
    Bot.monitors = Bot.monitors.filter(m => m.filename !== toUnload)
    return monitor.eventParams.message.reply([
        "I have unloaded \""+toUnload+"\" ... monitoring:",
        "+ "+Bot.monitors.map(m => m.filename).join("\n+ ")
    ].join("\n"))

}
