module.exports = async ( monitor ) => {

    if( monitor.eventParams.message.mentions.everyone ) {
        
        if( !monitor.eventParams.member.hasPermission("MENTION_EVERYONE") ) {
            monitor.eventParams.message.reply(
                "You can't tag everyone, you have no power here",
                { files:[ "https://cdn.discordapp.com/attachments/333971980497977345/530804692540981248/image.png" ] }
            )
        } else {
            monitor.eventParams.message.react("😅")
        }
    
    }

}
