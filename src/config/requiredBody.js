/**
 *  all the required and not required body, params query in the apis
 */
module.exports.requiredBody = {
    "login": {
            email: true,
            password: true,
    },
    "fire": {

    },
    "get_checks": {
        page: false,
        perPage:false
    },
    "get_checks_one": {
        id:true
    },
    "post_checks": {
        activated: true,
        checkType: true,
        name: true,
        script: true,
        ...unRequiredChecks
    },
    "put_checks": {
            id: true,
            activated: false,
            checkType: false,
            name: false,
            script: false,
            ...unRequiredChecks
    },
    "delete_checks": {
            id: true
    }
}

var unRequiredChecks = {
    muted: false,
    doubleCheck: false,
    locations: false,
    alertSettings: false,
    alertSettings: false,
    useGlobalAlertSettings: false,
    alertChannelSubscriptions: false,
    environmentVariables: false,
    tags: false
}