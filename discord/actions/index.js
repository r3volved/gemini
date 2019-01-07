module.exports = async ( monitor ) => {

    if( !monitor.actions ) return null

    let actions = []
    
    //Ensure actions is an array
    monitor.actions = Array.isArray(monitor.actions) ? monitor.actions : [ monitor.actions ]

    //Action in series
    for( let a of monitor.actions ) {
        if( !Bot.actions[a] ) continue 
        actions.push( await Bot.actions[a]( monitor ) )
    }

    //Return results of actions
    return actions
        
}
