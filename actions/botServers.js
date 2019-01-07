module.exports = async ( monitor ) => {

    monitor.response = {
        embed:{
            title: `**${Bot.discord.client.user.username} is in ${Bot.discord.client.guilds.size} servers**`,
            description: Bot.discord.client.guilds.map(g => {
                return `${g.id} : ${g.name}`
            })
        }
    }

}
