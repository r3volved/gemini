module.exports = async ( monitor ) => {
    monitor.actioned.push({ action:"delete", result:await monitor.eventParams.message.delete() })
    return true
}
