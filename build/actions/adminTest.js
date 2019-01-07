module.exports = async ( monitor ) => {

    let msgPcs = monitor.eventParams.message.content.split(/\s+/g)

    if( !Bot.actions[msgPcs[1]] ) {
        monitor.response.content = "I have no action \""+msgPcs[1]+"\""
        return false
    }
   
    monitor.response.content = "Results of \""+msgPcs[1]+"\" test ... "
    
    let result = await Bot.actions[msgPcs[1]]( monitor )
    let actionResult = monitor.actions[monitor.actions.length -1]

    monitor.response.content = [
        monitor.response.content,
        "```json",
        JSON.stringify(actionResult, null, 2),
        "```"
    ].join("\n")
    
    monitor.actions.push({ action:msgPcs[1], result:result })

    return true
        
}
