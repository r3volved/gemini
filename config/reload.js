module.exports = async ( monitor ) => {

    Bot.circularJSON = ( object ) => {
        let cache = []
        let stringified = JSON.stringify(object, (key, value) => {
            if (typeof value === 'object' && value !== null) {
                if (cache.indexOf(value) !== -1) {
                    // Duplicate reference found
                    try {
                        // If this value does not reference a parent it can be deduped
                        return JSON.parse(JSON.stringify(value))
                    } catch (error) {
                        // discard key if value cannot be deduped
                        return JSON.stringify({"circularRefId":value.id})
                    }
                }
                // Store value in our collection
                cache.push(value)
            }
            return value
        }, 2)
        cache = null
        return stringified
    }

    monitor.actioned = monitor.actioned || []
    monitor.response = monitor.response || {}
    
    //Delete all failed
    if( Bot.failed ) delete Bot.failed
    Bot.failed = {
        monitors:[],
        actions:[]
    }

    //Delete all monitors
    if( Bot.monitors ) delete Bot.monitors
    Bot.monitors = []
    
    const fs = require("fs")

    let monitorscount = 0
    let monitors = await fs.readdirSync(process.cwd()+"/monitors")

    for (let i = 0; i < monitors.length; i++) {
        
        //Skip examples
        if( monitors[i].includes( "example" ) ) continue        
        
        //Delete monitor cache
        delete require.cache[require.resolve(process.cwd()+"/monitors/"+monitors[i])]
        
        try {
            let tmpMonitor = require(process.cwd()+"/monitors/"+monitors[i])
                tmpMonitor.filename = monitors[i].replace(/\.\w{1,4}/g,'')

            //Re-append monitor
            Bot.monitors.push(tmpMonitor)
            monitorscount++
        } catch(e) {
            Bot.failed.monitors.push( monitors[i] )
            //Isolate and report failure
            Report.info( `GEMINI: Error loading monitor` )
            Report.error( e )
        }

    }
    
    Bot.monitors.sort((a,b) => a.priority - b.priority)
    
    //Update module response text
    monitor.response.content = "I have reloaded "+monitorscount+" monitor"+(monitorscount === 1 ? "" : "s")+" "

    //Delete all actions except reload
    if( Bot.actions ) delete Bot.actions
    Bot.actions = {
        reload:Bot.reload
    }
    
    let actionsscount = 0
    let actions = await fs.readdirSync(process.cwd()+"/actions")

    for (let i = 0; i < actions.length; i++) {
        
        //Skip examples
        if( actions[i].includes( "example" ) ) continue
        
        //Strip file extention for map string
        let thisAction = actions[i].replace(/\.\w{1,4}/g,'')        
        
        //Delete action cache
        delete require.cache[require.resolve(process.cwd()+"/actions/"+actions[i])]
        
        try {
            //Re-map action
            Bot.actions[thisAction] = require(process.cwd()+"/actions/"+actions[i])
            actionsscount++
        } catch(e) {
            Bot.failed.actions.push( thisAction )
            //Isolate and report failure
            Report.info( `GEMINI: Error loading action` )
            Report.error( e )
        }

    }

    //Update module response text
    monitor.response.content += "and "+actionsscount+" action"+(actionsscount === 1 ? "" : "s")+"\n"
    
    if( Bot.failed.monitors.length ) {
        monitor.response.content += "**" + Bot.failed.monitors.length + " monitors failed to load**\n"
        monitor.response.content += Bot.failed.monitors.join("\n")+"\n"
    }
    
    if( Bot.failed.actions.length ) {
        monitor.response.content += "**" + Bot.failed.actions.length + " actions failed to load**\n"
        monitor.response.content += Bot.failed.actions.join("\n")+"\n"
    }
    
    monitor.actioned.push({ action:"reload", result:"reloaded" })
    
    return true

}
