//Remove speficied roles to specified users
module.exports = async ( monitor ) => {

    let rolesnames = monitor.eventParams.message.content.match(/\[\s+(([\w|\-|\s]+[\,|\s]*)+)\s+\]/g)
    rolesnames = rolesnames.join("").replace("[","").replace("]","").split(",").map(r => r.toLowerCase().trim())
    
    let roleStatus = []
    let roles = monitor.eventParams.message.guild.roles.filter(r => {
        //Is in role list?
        if( !rolesnames.includes(r.name.toLowerCase()) ) return false                
        //Yes - append role status
        roleStatus.push((r.editable ? "`✔`" : "`❌`")+" : **"+r.name+"**")
        //Can I edit this role?
        if( !r.editable ) return false
        return true
    })
    
    let members = monitor.eventParams.message.mentions.members
    
    let memStatus = []
    let roled = members.map(m => {
        return new Promise(async res => {
            m.removeRoles( roles ).then(r => {
                memStatus.push("`✔` : **"+m.user.username+"**")
                res( true )
            }).catch(e => {
                memStatus.push("`❌` : **"+m.user.username+"**")
                res( false )
            })
        })
    })
    
    roled = await Promise.all( roled )

    let title = roled.filter(r => r).length 
        ? `Removed ${roles.size} from ${roled.filter(r => r).length} users`
        : `No roles were removed from any users`

    monitor.response = {
        content: [
            "```",
            monitor.eventParams.message.content,
            "```"
        ],
        embed:{
            title: title,
            description:[
                "*Note: I am only capable of removing roles available to me*"
            ],
            fields:[{
                name:"__Role capabilities__",
                value:roleStatus.join("\n"),
                inline:true
            },{
                name:"__Results__",
                value:memStatus.join("\n"),
                inline:true
            }]
        }
    }

}
