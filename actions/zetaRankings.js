module.exports = async ( monitor ) => {

    const zetaList = require( process.cwd()+"/data/zetas.json" )
    
    let zetas = Object.assign([],zetaList.zetas)
    let args = monitor.eventParams.message.content.split(/\s+/).slice(1).join(" ")

    console.log( zetas )

    let criteria = null
    let key = null
    switch( args.trim().toLowerCase() ) {
        case "tb":
        case "tbattles":
        case "territory battles":
            criteria = "Territory Battles"
            key = "tb"
            break
        case "tw":
        case "twar":
        case "twars":
        case "territory war":
        case "territory wars":
            criteria = "Territory Wars"
            key = "tw"
            break
        case "pvp":
        case "arena":
            criteria = "PVP Arena"
            key = "pvp"
            break
        case "rancor":
        case "pit":
            criteria = "Rancor Raid"
            key = "pit"
            break
        case "tank":
        case "aat":
        case "haat":
            criteria = "AAT Raid"
            key = "tank"
            break
        case "sith":
            criteria = "Sith Raid"
            key = "sith"
            break
        default:
    }            
    
    zetas = zetas.filter(z => {
        return z.toon.toLowerCase().includes(args.toLowerCase()) || z.name.toLowerCase().includes(args.toLowerCase())    
    })
    
    if( !key && zetas.length ) {
    
        //Matches toon name
        zetas.sort((a,b) => a.toon - b.toon)
        
        monitor.response = {
            embed: {
                title:`Found ${zetas.length} matches`,
                description:[
                    "```(best) 1 -to- 10 (worst)```"
                ],
                fields:zetas.map(zeta => {
                    return {
                        name: [ `**${zeta.toon}**`, zeta.type+" : "+zeta.name ],
                        value:[
                            "**`"+zeta.tb.toFixed(2)+"`**"+" : Territory Battles",
                            "**`"+zeta.tw.toFixed(2)+"`**"+" : Territory Wars",
                            "**`"+zeta.pvp.toFixed(2)+"`**"+" : PvP Arena",
                            "**`"+zeta.pit.toFixed(2)+"`**"+" : Rancor Raid",
                            "**`"+zeta.tank.toFixed(2)+"`**"+" : Tank Raid",
                            "**`"+zeta.sith.toFixed(2)+"`**"+" : Sith Raid",
                            "**`"+zeta.versa.toFixed(2)+"`**"+" : Versatility",
                            "`------------------------------`"
                        ],
                        inline:true
                    }
                })
            }
        }

    } else {
    
        criteria = criteria ||"Versatility"
        key = key || "versa"
    
        zetas = Object.assign([],zetaList.zetas)
        zetas = zetas.sort((a,b) => {
            return (Number(a[key]) || 0) - (Number(b[key]) || 0)
        })
            
        monitor.response = {
            embed: {
                title:`Top 20 zetas for ${criteria}`,
                description:[
                    "```(best) 1 -to- 10 (worst)```"
                ],
                fields:[{
                    name: ["Top 1-10","`------------------------------`"],
                    value: zetas.splice(0,10).map(zeta => {
                        return [
                            "**"+zeta.name+"**",                               
                            "**`"+zeta[key].toFixed(2)+"`** : "+zeta.toon,
                        ].join("\n")
                    }),
                    inline:true
                },{
                    name: ["Top 11-20","`------------------------------`"],
                    value: zetas.splice(0,10).map(zeta => {
                        return [
                            "**"+zeta.name+"**",                               
                            "**`"+zeta[key].toFixed(2)+"`** : "+zeta.toon,
                        ].join("\n")
                    }),
                    inline:true
                }]
            }
        }

    }    
    
}

