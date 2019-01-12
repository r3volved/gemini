module.exports = {

    home: ( req, res, next ) => {
        
        let html = ""
        
        html += `<div style="width:100%; vertical-align:top">`

        html += `<div style="display:inline-block; padding:20px; vertical-align:top">`

        html += `<h1>Hello, I am ${Bot.discord.client.user.username}</h1>`
        html += `<ul>`
        html += `<li><strong>App core</strong> : <span>${Bot.app.name}</span></li>`
        html += `<li><strong>App version</strong> : <span>${Bot.app.version}</span></li>`
        html += `<li><strong>App description</strong> : <span>${Bot.app.description}</span></li>`
        html += `</ul>`

        html += `<h2>Instance</h2>`
        html += `<ul>`
        html += `<li><strong>ID</strong> : <span>${Bot.discord.client.user.id}</span></li>`
        html += `<li><strong>Tag</strong> : <span>${Bot.discord.client.user.tag}</span></li>`
        html += `<li><strong>Ready</strong> : <span>${(new Date(Bot.discord.client.readyTimestamp)).toLocaleString()}</span></li>`
        html += `<li><strong>Uptime</strong> : <span>${(Bot.discord.client.uptime/60000).toFixed(2)} min</span></li>`
        html += `<li><strong>Average Ping</strong> : <span>${Bot.discord.client.ping.toFixed(2)} ms</span></li>`
        html += `<li><strong>Available Guilds</strong> : <span>${Bot.discord.client.guilds.size}</span></li>`
        html += `<li><strong>Available Channels</strong> : <span>${Bot.discord.client.channels.size}</span></li>`
        html += `<li><strong>Active Polls</strong> : <span>${Bot.activePolls || 0}</span></li>`
        html += `</ul>`
        html += `</div>`

        html += `<div style="display:inline-block; padding:20px; vertical-align:top">`
        html += `<h2>Monitors</h2>`
        html += `<ul>`
        Bot.monitors.forEach(g => {
            html += `<li>${g.filename}</li>`        
        })        
        html += `</ul>`
        html += `</div>`

        html += `<div style="display:inline-block; padding:20px; vertical-align:top">`
        html += `<h2>Actions</h2>`
        html += `<ul>`
        Object.keys(Bot.actions).forEach(a => {
            html += `<li>${a}</li>`        
        })        
        html += `</ul>`
        html += `</div>`

        html += `</div>`

        res.send(html)
    
    }

}
