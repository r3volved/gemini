module.exports = ( monitor ) => {

    //Check author permissions
    return monitor.eventParams.member && monitor.conditions.permissions && monitor.conditions.permissions.length
        ? monitor.eventParams.member.hasPermission(monitor.conditions.permissions)
        : false

}
