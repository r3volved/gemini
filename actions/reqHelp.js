module.exports = async ( monitor ) => {

    let squad = monitor.eventParams.message.content.toLowerCase().replace(/required|req/i,'').trim()
    if( squad.toLowerCase() === 'help' ) { 
        delete monitor.response
        return 
    }

    let farms = require(process.cwd()+"/data/farms.json")

    let file = (() => {
        switch( squad.toLowerCase() ) {
            //STATS
            case "ep":
            case "palp":
            case "palpatine":
            case "palpetine":
                return "legendary-palpatine.txt"
            case "gat":
            case "thrawn":
                return "legendary-thrawn.txt"
            case "r2":
            case "r2d2":
            case "r2-d2":
                return "legendary-r2d2.txt"
            case "cls":
            case "luke":
                return "legendary-cls.txt"
            case "gmy":
            case "yoda":
                return "legendary-gmy.txt"
            case "revan":
                return "legendary-revan.txt"
            case "bb8":
            case "bb-8":
                return "legendary-bb8.txt"
            case "rjt":
            case "jtr":
            case "rey":
                return "legendary-rjt.txt"
            case "chew":
            case "chewie":
            case "chewbacca":
                return "legendary-chewbacca.txt"
            case "chimera":
            case "chimaera":
            case "chimeara":
                return "legendary-chimaera.txt"

            default:
                return null
        }    
    })()
    
    if( !file ) {
        
        monitor.response = {
            content:[
                "Sorry, I don't know "+squad+" yet ... I am constantly updating though!",
                "For the requirements I do know so far, try **`req help`**"
            ]
        }
    
    } else {
        
        const fs = require('fs')
        const data = await fs.readFileSync( process.cwd()+"/data/requirements/"+file )
    
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
                if( field ) {
                    embed.fields.push(field)
                }
                field = {
                    name: [ line ],
                    value: [],
                    inline: true
                }
                newToon = true
                type++           
                return
            } 

            if( newToon ) {
                newToon = false
            }

            if( !type ) {
                embed.description.push( "**```"+line+"```**" )
            } else {
                let farm = farms.units.find(f => { 
                    return line.split("/").find(l => {
                        return f.tags.includes(l.trim())
                    })
                })
                
                let farmStr = farm && farm.locations.length ? farm.locations.map(f => {
                    return !farms.emojis[f] ? "**`"+f+"`**" : farms.emojis[f]                    
                }).join(", ") : null
                
                field.value.push( line+(farmStr ? " : "+farmStr : "") )
            }
            
        })
        
        if( field ) {
            if( field.name.find(n => n.toLowerCase().includes("notes")) ) {
                field.inline = false
            }
            embed.fields.push(field)
        }
        
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
