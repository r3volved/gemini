module.exports = async ( monitor ) => {

    let squad = monitor.eventParams.message.content.toLowerCase().replace(/(((how to|help me) mod)|htm|hmm){1}\s/gi,'')
    
    let file = (() => {
        switch( squad.toLowerCase() ) {
            //STATS
            case "speed":
                return "speed.txt"
            case "tank":
            case "tanks":
                return "tanks.txt"
            //UNITS
            case "bh":
            case "bounty hunter":
            case "bounty hunters":
            case "bossk":
                return "bounty-hunters-bossk.txt"
            case "ns":
            case "nightsister":
            case "nightsisters":
            case "night sister":
            case "night sisters":
            case "asajj":
                return "night-sisters-asajj.txt"
            case "first order":
            case "fo":
            case "kru":
                return "first-order-kru.txt"
            case "rebel":
            case "rebels":
            case "cls":
                return "rebels-cls.txt"
            case "traya":
                return "sith-traya.txt"
            case "bastila":
            case "bastilla":
                return "jedi-bastila.txt"
            case "revan":
                return "jedi-revan.txt"
            case "ewok":
            case "ewoks":
            case "chirpa":
                return "ewoks-chirpa.txt"
            case "scound":
            case "scoundrel":
            case "scoundrels":
            case "qira":
                return "scoundrels-qira.txt"
            case "phoenix":
            case "phenix":
            case "hera":
                return "phoenix-hera.txt"
            case "or":
            case "old republic":
                return "old-republic-carth.txt"
            default:
                return null
        }    
    })()
    
    if( !file ) {
        
        monitor.response = {
            content:[
                "Sorry, I don't know this one yet ... I am constantly updating though!",
                "For the modding commands I do know so far, try **`modding help`**"
            ]
        }
    
    } else {
        
        const fs = require('fs')
        const data = await fs.readFileSync( process.cwd()+"/data/mod-help/"+file )
    
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

            line = line.toLowerCase().startsWith('note') || line.toLowerCase().startsWith('stat') || line.toLowerCase().startsWith('priorities') || line.toLowerCase().startsWith('target')
                ? line.split(":").map(l => l.trim()).join(": *")+"*"
                : line.toLowerCase().endsWith(")") 
                    ? "__"+line.split("(").map(l => l.trim()).join("__ (")
                    : type 
                        ? "__"+line+"__"
                        : line
            
            if( newToon ) {
                newToon = false
            } else {
                line = line.replace(/\_\_/g,'')
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
