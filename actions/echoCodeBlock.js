//Echo message.content in a code block
module.exports = async ( monitor ) => {

    const content = monitor.eventParams.message.content.split(/\s+/).slice(2).join(" ")
    monitor.response = {
        content: [
            "Echo in code block",
            "```",
            content,
            "```"
        ]
    }

}
