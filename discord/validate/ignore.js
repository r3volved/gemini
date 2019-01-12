module.exports = ( monitor ) => {

    //Ignore self
    let ignore = monitor.conditions.ignore.self && monitor.eventParams.author && monitor.eventParams.author.id === Bot.discord.id
    if( ignore ) return true

    //Skip if no ignore parameters
    if( !monitor.conditions || !monitor.conditions.ignore ) return true

    //Ignore bots
    ignore = monitor.conditions.ignore.bots && monitor.eventParams.author && monitor.eventParams.author.bot
    if( ignore ) return true
    
    //Ignore override author
    ignore = ignore || monitor.conditions.ignore.users && monitor.conditions.ignore.users.length
        ? monitor.eventParams.author 
            ? monitor.conditions.ignore.users.includes( monitor.eventParams.author.id ) || monitor.conditions.ignore.users.includes( monitor.eventParams.author.tag )
            : false
        : false
        
    //Ignore override servers
    ignore = ignore || monitor.conditions.ignore.servers && monitor.conditions.ignore.servers.length
        ? monitor.eventParams.member 
            ? monitor.conditions.ignore.servers.includes( monitor.eventParams.member.guild.id )
            : false
        : false

    if( ignore ) return true

    //Ignore override roles
    ignore = ignore || monitor.conditions.ignore.roles && monitor.conditions.ignore.roles.length
        ? monitor.eventParams.member 
            ? monitor.eventParams.member.roles.some(r => monitor.conditions.ignore.roles.includes(r.name))
            : false    
        : false

    return ignore

}
