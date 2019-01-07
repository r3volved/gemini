module.exports = ( monitor ) => {

    return monitor.eventParams.message && monitor.triggers.text && monitor.triggers.text.length
        ? monitor.eventParams.message.content.toLowerCase().includes( monitor.triggers.text.toLowerCase() )
        : false

}
