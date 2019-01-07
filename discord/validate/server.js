module.exports = ( monitor ) => {

    //Check server id
    return monitor.eventParams.server && monitor.conditions.servers && monitor.conditions.servers.length
        ? monitor.conditions.servers.includes( monitor.eventParams.server.id )
        : false

}
