module.exports = ( monitor ) => {

    return monitor.eventParams.message && monitor.triggers.mentions && monitor.triggers.mentions.length
        ? monitor.eventParams.message.mentions.users
            .filter(u =>  monitor.triggers.mentions.includes( u.id ) || monitor.triggers.mentions.includes( u.tag )).size
        : false

}
