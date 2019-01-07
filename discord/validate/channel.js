module.exports = ( monitor ) => {

    //Check channel id
    return monitor.eventParams.channel && monitor.conditions.channels && monitor.conditions.channels.length 
        ? monitor.conditions.channels.includes( monitor.eventParams.channel.id )
        : false
    
}
