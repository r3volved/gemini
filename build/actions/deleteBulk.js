module.exports = async ( monitor ) => {
    
    let num = monitor.eventParams.message.content.split(" ").find(c => c.match(/^\d+$/)) || 10    
        num = num > 100 ? 100 : num
         
    let member = monitor.eventParams.message.guild.member(Bot.discord.client.user)
    let permissioned = monitor.eventParams.message.channel.permissionsFor(member)
    
    return permissioned
        ? await monitor.eventParams.message.channel.bulkDelete(num)
        : await monitor.eventParams.message.react("👎")

}
