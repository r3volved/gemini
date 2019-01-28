//Verify server is over 500
//Apply "verified" to admins of these servers at home
module.exports = async ( monitor ) => {
    
    if( monitor.eventParams.server.memberCount < 500 ) {
        
        monitor.eventParams.message.reply("Sorry, I can only remotely verify servers with more than 500 members.\nTo verify, please have an admin [join us on our home server](https://discord.gg/TwN6rhq) to represent your server and request verification in our #get-verified channel.")
    
    } else {

        //Get members with admin
        await monitor.eventParams.server.fetchMembers()
        const admins = monitor.eventParams.server.members.filter(m => m.hasPermission("ADMINISTRATOR") && !m.user.bot)

        //Get members from home
        const home = Bot.discord.client.guilds.get(Bot.config.home)
        
        //For each admin @ home 
        const verifiedRoles = home.roles.filter(r => r.name.toLowerCase() === Bot.config.verified)
        
        let verified = false
        for(let a of admins) {
            let homeMember = home.members.get(a[0])

            if( !homeMember || Bot.trolls.suspected.includes(homeMember.user.id) || Bot.trolls.confirmed.includes(homeMember.user.id) ) continue

            if( verifiedRoles && homeMember ) { 
                //-> add verified role
                homeMember.addRoles(verifiedRoles).catch(e => {})
                //-> verified = true
                verified = true
            }    
        }

        //If verified...
        if( verified ) {
            //-> return success message    
            monitor.eventParams.message.reply("This server has been verified!")
        } else {
            //-> return verification instructions
            monitor.eventParams.message.reply("This server was not verified...\nTo verify, please have an admin [join us on our home server](https://discord.gg/TwN6rhq) to represent your server and request verification in our #get-verified channel.")
        }    

    }
    
}
