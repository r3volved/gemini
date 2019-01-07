module.exports = {

    client : null,
    
    init     : require('./handlers'),
    validate : require('./validate'),
    triggers : require('./triggers'),
    actions  : require('./actions')
    
}
