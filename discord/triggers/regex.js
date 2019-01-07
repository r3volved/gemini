module.exports = ( monitor ) => {

    return monitor.eventParams.message && monitor.triggers.regex && monitor.triggers.regex.length 
        ? monitor.eventParams.message.content.match(new RegExp( monitor.triggers.regex, "gi" ))
        : false
        
}
