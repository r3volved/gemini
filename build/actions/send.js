module.exports = async ( monitor ) => {

    if( !monitor.response ) return false
    
    let stringified = JSON.stringify(monitor.response)
    
    //Replace {@author} with author mention || {author} with author name
    stringified = stringified.replace(/\{\@author\}/g, "<@"+monitor.eventParams.author.id+">")
    stringified = stringified.replace(/\{author\}/g, monitor.eventParams.author.username)
    
    //Replace {@member} with member mention || {member} with member name
    stringified = stringified.replace(/\{\@member\}/g, "<@"+monitor.eventParams.member.id+">")
    stringified = stringified.replace(/\{member\}/g, monitor.eventParams.member.user.username)

    monitor.response = JSON.parse(stringified)

    try {

        monitor.response.content = monitor.response.content && Array.isArray(monitor.response.content) 
            ? monitor.response.content.join("\n") 
            : monitor.response.content

        let embed = monitor.response.embed
        if( embed && typeof embed === "object" ) {
        
            if( monitor.image ) { embed.image = { url: monitor.image } }
            if( embed.thumbnail && embed.thumbnail.url && Array.isArray(embed.thumbnail.url) ) {
                let rnd = Math.floor(Math.random() * Math.floor(embed.thumbnail.url.length))
                embed.thumbnail = { url: embed.thumbnail.url[rnd] }
            } 
        
            //Join arrays with line breaks
            embed.title = Array.isArray(embed.title) ? embed.title.join("\n") : embed.title
            embed.description = Array.isArray(embed.description) ? embed.description.join("\n") : embed.description

            //Join arrays with line breaks
            if( embed.fields && embed.fields.length ) {
                embed.fields.forEach(f => {
                    f.name = Array.isArray(f.name) ? f.name.join("\n") : f.name
                    f.value = Array.isArray(f.value) ? f.value.join("\n") : f.value
                })
            }
            
            //Override footer
            embed.timestamp = new Date()
            embed.footer = { text:"GEMINI" }

        }
        
        if( monitor.replied ) {
            monitor.replied = embed
                ? monitor.response.content
                    ? await monitor.replied.edit(monitor.response.content, {embed})
                    : await monitor.replied.edit({embed})
                : monitor.response.content
                    ? await monitor.replied.edit(monitor.response.content, ( monitor.response.image ? { files:[monitor.response.image] } : null ))
                    : await monitor.replied.edit(( monitor.response.image ? { files:[monitor.response.image] } : null ))
        } else {
            if( !monitor.response.dm ) {
                monitor.replied = embed
                    ? monitor.response.content
                        ? await monitor.eventParams.channel.send(monitor.response.content, {embed})
                        : await monitor.eventParams.channel.send({embed})
                    : monitor.response.content
                        ? await monitor.eventParams.channel.send(monitor.response.content, ( monitor.response.image ? { files:[monitor.response.image] } : null ))
                        : await monitor.eventParams.channel.send(( monitor.response.image ? { files:[monitor.response.image] } : null ))
            } else {
                monitor.replied = embed
                    ? monitor.response.content
                        ? await monitor.eventParams.author.send(monitor.response.content, {embed})
                        : await monitor.eventParams.author.send({embed})
                    : monitor.response.content
                        ? await monitor.eventParams.author.send(monitor.response.content, ( monitor.response.image ? { files:[monitor.response.image] } : null ))
                        : await monitor.eventParams.author.send(( monitor.response.image ? { files:[monitor.response.image] } : null ))
            }
        }  
                              
        monitor.actioned.push({ action:"send", result:monitor.replied })
        return true
    } catch(e) {
        Report.error("BOT: Send error", e)
        return false
    }

}
