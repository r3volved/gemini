//Eval-like command returning function results
//ALWAYS SCOPE THIS TO ADMIN

//Takes message content and 
module.exports = async ( monitor ) => {

    const toEval = monitor.eventParams.message.content.replace(/\n/g,"").split(" ").slice(1).join(" ")
    monitor.response = {
        content: "Results of `\""+toEval+"\"` test ... "
    }
    
    let result = null
    
    try {
     
        result = Function('"use strict"; return (' + toEval + ')')()

        result = result ? Bot.circularJSON(result) : result;

        result = result ? result.replace(/\w+\.\w+\.[\w\-]+/,"No_Token_Here") : typeof result
        
        if( result.length > 1800 ) {
            result = JSON.stringify({
                error:"Result is too large for discord",
                keys:typeof result === "object" ? Object.keys(result) : []
            },null,2)
        }

    } catch(e) {
        result = JSON.stringify({error:e.message},null,2)
    }

    monitor.response.content = [
        monitor.response.content,
        "```json",
        result,
        "```"
    ].join("\n")

}
