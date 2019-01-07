module.exports = async ( monitor ) => {

    const searchText = monitor.eventParams.message.content.split(/\s/).slice(2).join(" ").trim()
    const wikiLink   = monitor.wiki.search+encodeURIComponent(searchText)
    
    const fetch = require("node-fetch")
    const result = await (await fetch(wikiLink)).json()
    
    monitor.response = {
        embed:{
            title: `Found ${result.query.searchinfo.totalhits} results`,
            description: [
                monitor.wiki.base,
                `Limited to maximum 10 results`
            ],
            fields: result.query.search.map(s => {
                return s.snippet ? {
                    name: [
                        "__"+s.title+"__",
                        "*"+monitor.wiki.base+s.title.replace(/\s/g,"_")+"*"
                    ],
                    value: s.snippet.replace(/\<span class\=\'searchmatch\'\>|\<\/span\>/g,"**").replace(/\[|\]/g,''),
                    inline:true   
                } : null
            }).filter(f => f).slice(0,10)
        }
    }

}
