# GEMINI
"No-code", config-driven discord bot


## Setup


### From source

Required: Node8+, npm

- Install node dependencies

    `npm install`


### From compiled

Unzip desired version 

- from /build/published 
- to desired location


### Configure bot settings

1. Acquire bot token from Discord
   
    `https://discordapp.com/developers/applications/me`

2. Update config.json
   - Add your bot token
   - Add your discord Id as master
   - Add your preferred prefix (currently not used)


## Running


### From source

- Windows/Linux (via command prompt)

    `node ./path/to/gemini/build/gemini.js`


### From compiled

- Windows (via command prompt) 

    `./path/to/gemini/gemini-win.exe`

- Linux (via command prompt) 

    `./path/to/gemini/gemini-linux`


## Monitors (commands)

Monitors are defined via .json files within /monitors.

...coming soon


## Custom actions

Actions are defined via .js files within /actions

...coming soon

