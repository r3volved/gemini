module.exports = ( monitor ) => {

    //Ignore if no params to check
    if( !monitor.eventParams ) return true
    
    //If flagged to ignore, return false
    if( require("./ignore.js")( monitor ) ) return false

    //If author check is false, return false
    if( monitor.conditions.authors.length  && !require("./author.js")( monitor ) ) return false

    //If channel check is false, return false
    if( monitor.conditions.channels.length && !require("./channel.js")( monitor ) ) return false

    //If server check is false, return false
    if( monitor.conditions.servers.length  && !require("./server.js")( monitor ) ) return false

    //If no conditions specified or all conditions met, return true
    return true
    
}
