module.exports = async ( monitor ) => {

    let squad = monitor.eventParams.message.content.toLowerCase().replace(/how to beat|htb/gi,'').trim()
    
    let file = (() => {
        switch( squad.toLowerCase() ) {
            case "bh":
            case "bounty hunter":
            case "bounty hunters":
                return "bounty-hunters.txt"
            case "revan":
            case "jedi revan":
            case "jedi knight revan":
                return "jedi-revan.txt"
            case "cls":
            case "commander luke":
            case "commander luke skywalker":
                return "commander-luke.txt"
            case "traya":
            case "darth traya":
                return "darth-traya.txt"
            default:
                return null
        }    
    })()
    
    if( !file ) {
        
        monitor.response = {
            content:[
                "Sorry, I don't know this one yet ... I am constantly updating though!",
                "For the counter strategies I do know so far, try **`counter help`**"
            ]
        }
    
    } else {
        
        const fs = require('fs')
        const data = await fs.readFileSync( process.cwd()+"/data/counter-help/"+file )
    
        let first = true
        let embed = {
            title:[],
            description:[],
            fields:[]
        }
        
        let type  = 0
        let field = null
        let newToon = true
        
        data.toString().split("\n").forEach( line => {
            if( !line || !line.trim().length ) {
                newToon = true
                return
            }
            
            if( first ) {
                if( line.startsWith("http") ) {
                    monitor.thumbnail = line
                } else {
                    embed.title.push(`**${line}**`)
                    first = false
                }
                return
            } 
            
            if( line.startsWith("==") ) {
                if( field ) embed.fields.push(field)
                field = {
                    name: [ "**=="+line.slice(2).replace("==","==**").split("(").join("\n(") ],
                    value: []
                }
                newToon = true
                type++           
                return
            } 
            
            if( newToon ) {
                line = type ? line.split(",").map(l => `__${l.trim()}__`).join(", ") : line
                newToon = false
            } 

            if( !type ) {
                embed.description.push( "**```"+line+"```**" )
            } else {
                field.value.push( line )
            }
            
        })
        
        if( field ) embed.fields.push(field)
        
        //Append courtesy field
        embed.fields.push({
            "name":"_____",
            "value":"Courtesy of NvR24 and [SWGoH University](https://discord.gg/euSynux)",
            "inline":false
        })

        //Add random thumbnail to embed
        if( monitor.thumbnail ) {
            if( Array.isArray(monitor.thumbnail) ) { 
                let rnd = Math.floor(Math.random() * Math.floor(monitor.thumbnail.length))
                embed.thumbnail = { url: monitor.thumbnail[rnd] }
            } else {
                embed.thumbnail = { url: monitor.thumbnail }
            }
        }
        
        monitor.response = { embed : embed }

    }
    
}

