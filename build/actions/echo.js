module.exports = async ( monitor ) => {

    const content = monitor.eventParams.message.content.split(/\s+/).slice(2).join(" ")
    monitor.response = {
        content: [
            "```",
            content,
            "```"
        ]
    }

}
