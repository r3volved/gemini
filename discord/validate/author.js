module.exports = ( monitor ) => {

    //Check author id
    return monitor.eventParams.author && monitor.conditions.authors && monitor.conditions.authors.length
        ? monitor.conditions.authors.includes( monitor.eventParams.author.id ) || monitor.conditions.authors.includes( monitor.eventParams.author.tag )
        : false

}
