module.exports = async ( monitor ) => {
    
    if( !monitor.response.react || !monitor.response.react.length ) return false
    try {
        monitor.reaction = await monitor.eventParams.message.react(monitor.response.react)
        monitor.actioned.push({ action:"react", result:monitor.reaction })
        return true
    } catch(e) {
        Report.error("React error", e)
        return false
    }

}
