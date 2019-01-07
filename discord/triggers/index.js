module.exports = ( monitor ) => {

    let triggered = !monitor.triggers
    
    triggered = triggered || require("./regex.js")( monitor )
    triggered = triggered || require("./text.js")( monitor )
    triggered = triggered || require("./mention.js")( monitor )

    //triggered = triggered || require("./emoji.js")
    //triggered = triggered || require("./link.js")
    //triggered = triggered || require("./image.js")
    
    return triggered

}
