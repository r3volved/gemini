module.exports = async ( monitor ) => {
    
    if( typeof monitor.response === 'string' ) {
        
        const fs = require('fs')
        const data = await fs.readFileSync( process.cwd()+"/data/mod-help/"+monitor.response )
    
        let first = true
        let embed = {
            title:[],
            description:[],
            fields:[]
        }
        
        let type  = 0
        let field = null
        data.toString().split("\n").forEach( line => {
            if( !line || !line.trim().length ) return
            if( first ) {
                embed.title.push(`**${line}**`)
                first = false
                return
            } 
            
            if( line.startsWith("==") && line.toLowerCase().includes("core") ) {
                embed.title.push("__=="+line.slice(2).replace("==","==__"))
                return
            }

            if( line.startsWith("==") ) {
                if( field ) embed.fields.push(field)
                field = {
                    name: [ "__=="+line.slice(2).replace("==","==__") ],
                    value: []
                }
                type++           
                return
            } 

            line = line.toLowerCase().startsWith('stat') || line.toLowerCase().startsWith('priorities') || line.toLowerCase().startsWith('targets')
                ? line.split(":").map(l => l.trim()).join(": *")+"*"
                : line.toLowerCase().endsWith(")") 
                    ? "**"+line.split("(").map(l => l.trim()).join("** (")
                    : "**"+line+"**"

            if( !type ) {
                embed.description.push( line )
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
