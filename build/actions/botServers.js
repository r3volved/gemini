module.exports = async ( monitor ) => {

    let regions = Bot.discord.client.guilds.reduce((reg,g) => {
        reg[g.region] = reg[g.region] || []
        reg[g.region].push( g )
        return reg
    },{})

    monitor.response = {
        embed:{
            title: `**${Bot.discord.client.user.username} servers**`,
            description: `${Bot.discord.client.user.username} is in **${Bot.discord.client.guilds.size}** servers across **${Object.keys(regions).length}** regions`,
            fields: Object.keys(regions).map(r => {
                return {
                    name:r,
                    value:regions[r].map(g => {
                        return `\`${g.id}\` : ${g.name}`
                    })
                }
            })
        }
    }

}
