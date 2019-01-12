module.exports = async ( monitor ) => {

    const id = monitor.eventParams.message.content.split(/\s+/).find(c => c.toString().match(/^\d{17,18}$/))
    const guild = Bot.discord.client.guilds.get(id)

    try {    
        await guild.leave()
        await monitor.eventParams.message.react("👍")
        monitor.response = {
            content:`I have removed myself from ${guild.name}`
        }
    } catch(e) {
        monitor.eventParams.message.react("👎")
        console.error(e)
    }

}
