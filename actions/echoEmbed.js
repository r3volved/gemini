//Echo client.content in an embed
module.exports = async ( monitor ) => {

    const content = monitor.eventParams.message.content.split(/\s+/).slice(2).join(" ")
    monitor.response = {
        embed:{
            title: "Echo in embed",
            description: content
        }
    }

}
