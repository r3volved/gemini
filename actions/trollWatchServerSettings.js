//Report the current server troll settings
module.exports = async ( monitor ) => {

    if( !monitor.serverConfig ) return
    
    let dmNames = monitor.serverConfig.dm.map(i => monitor.eventParams.server.members.get(i).displayName)
    
    monitor.response = {
        embed: {
            title:[
                "Troll-trace settings",
                "**== Current Config ==**"
            ],
            description:[
                `When troll identified...`,
                `**Actions** : **\`${monitor.serverConfig.action.length ? monitor.serverConfig.action.join('`->`') : "none"}\`**`,
                `**Roles** : **\`${monitor.serverConfig.roles.length ? monitor.serverConfig.roles.join('` + `') : "none"}\`**`,
                `**DM to** : **\`${dmNames.length ? dmNames.join('` + `') : "none"}\`**`,
                "`"+"-".repeat(30)+"`"
            ].join("\n"),
            fields:[{
                name:"== Config Commands ==",
                value:[
                    "`set troll warning  on|off`",
                    "`set troll autoban  on|off`",
                    "`set troll autokick on|off`",
                    "`set troll autorole on|off`",
                    "`set troll role MyRoleName`",
                    "`set troll dm @user`"
                ].join("\n")
            },{
                name:"== Config Help ==",
                value:[
                    "Verify your server and start troll tracking",
                    "`verify server`",
                    "Retroactively examine your current member list and action confirmed trolls",
                    "`scan for trolls`"
                ].join("\n")
            }]
        }
    }
    
}
