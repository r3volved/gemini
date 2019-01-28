//Report client presence with member counts
module.exports = async ( monitor ) => {

    let guilds = [].concat(Bot.discord.client.guilds.array().sort((a,b) => a.name < b.name ? -1 : 1))
    let members = Bot.discord.client.guilds.reduce((sum,g) => {
        return sum + g.memberCount
    },0)
    
    monitor.response = {
        embed:{
            title: `**${Bot.discord.client.user.username} Coverage**`,
            description: [
                `Monitoring **${Bot.discord.client.guilds.size}** Servers`,
                `Securing **${members}** Users`
            ],
            fields: []
        }
    }
    
    while( guilds.length > 0 ) {    
        monitor.response.embed.fields.push({
            name:"Users === Server =============== ",
            value:guilds.splice(0,20).map(g => {
                let name = g.memberCount+" ".repeat(6 - g.memberCount.toString().length)+"✦ "+g.name
                let namePcs = []
                
                while( name.length > 30 ) {
                    let indx = name.lastIndexOf(" ", 30)
                    namePcs.push( name.slice(0, indx) )
                    name = name.slice(indx)
                }

                namePcs.push(name)
                
                return "`"+namePcs.join("\n        ")+"`"
            }),
            inline:true
        })
    }

}
