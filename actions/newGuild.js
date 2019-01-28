//When added to new server, create new config in db
module.exports = async ( monitor ) => {

    const guild = monitor.eventParams.server
    await guild.fetchMembers()

    let embed = {
        title:"I just joined a new server",
        description:[
            "Id: "+guild.id,
            "**"+guild.name+"**",
            "Members: "+guild.memberCount
        ].join("\n"),
        fields:[{
            name:"Admins",
            value:guild.members.filter(m => m.hasPermission("ADMINISTRATOR")).map(m => m.user.tag+" : <@!"+m.user.id+">").join("\n")
        }],
        color:4354047
    }
    Bot.discord.client.channels.get(Bot.config.notifications).send({embed})
    
}
