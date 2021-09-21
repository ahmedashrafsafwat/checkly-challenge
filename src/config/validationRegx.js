/** 
 * all the regex for all fields 
 * More regex can be added for extra validations
*/
module.exports.validationRgex = {
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/,// minimum 4 chars at least one letter and one number
    string: /^[0-9a-zäöü\- ]+$/ui, // unicode regex
    number: /^[0-9a-fA-F]{0,500}$/, 
    boolean: /^(true|false)$/,
    date: 'date',
    activated: /^(true|false)$/,
    checkType: /^[0-9a-zäöü\- ]+$/ui,
    name: /^[0-9a-zäöü\- ]+$/ui,
    script: /^[0-9a-zäöü\- ]+$/ui,
    muted: /^(true|false)$/,
    doubleCheck: /^(true|false)$/,
    locations: 'array',
    alertSettings: 'object',
    useGlobalAlertSettings: /^(true|false)$/,
    alertChannelSubscriptions: 'array',
    environmentVariables: 'array',
    tags: 'array'
}