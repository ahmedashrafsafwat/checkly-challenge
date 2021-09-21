/** middleware for body,query,params validation and checking */
const {
    requiredBody
} = require("../config/requiredBody");
const {
    validationRgex
} = require("../config/validationRegx");
const {
    errorResponse,
    isValidDate
} = require("../helper");
const checkDef = require('../config/checkDef.json')

var errors = []


module.exports.validateCheck = (req, res, next) => {
    let {
        body
    } = req;

    errors = []

    for (const key in body) {
        let type = checkDef[key];
        if(!type) {
            // then push the key to list of unknown check defenation
            errors.push(`The '${key}' is not in the current recognised check defenations`)

        } else {
        if ((body[key] !== 'object' && body[key] !== null && !Array.isArray(body[key])) || (type == "array")) {
            let errMess = `The key ${key} in your config file is not set to the right type and it should be of type of ${type}`

            checkKeyValidation(type, body[key], errMess)
        } else if (typeof body[key] === 'object' && body[key] !== null) {
            for (const subKey in body[key]) {
                let errMessSub = `The key ${subKey} inside object of name ${key} in your config file is not set to the right type and it should be of type of ${type}`
                checkKeyValidation(type[subKey], body[key][subKey], errMessSub)
            }
        } else if (Array.isArray(body[key])) {
            if (Array.isArray(type)) {

                let bodyArr = body[key];
                bodyArr.forEach((ele, index) => {
                    for (const subKey in ele) {

                        let errMessSub = `The key ${subKey} inside array of key name ${key} in index number ${index+1} inside your config file is not set to the right type and it should be of type of ${type[0][subKey]}`
                        checkKeyValidation(type[0][subKey], ele[subKey], errMessSub)
                    }

                });
            } else {
                errors.push(`${body[key]} is not of type array it should be of type ${type}`)
            }

        }
    }
    }

    if (errors.length > 0) {
        return errorResponse(errors.join(", "), 407, res)
    }
    next();
}
var checkKeyValidation = (checkDef, sendCheckDef, errMess) => {
    if (checkDef === "string") {
        if (typeof sendCheckDef !== 'string') {
            errors.push(errMess);
        }
    } else if (checkDef === "number") {
        if (isNaN(sendCheckDef)) {
            errors.push(errMess);
        }
    } else if (checkDef === "boolean") {
        if (typeof sendCheckDef != "boolean") {
            errors.push(errMess);
        }
    } else if (checkDef == "date") {
        if (!isValidDate(sendCheckDef)) {
            errors.push(errMess);
        }
    } else if (checkDef == "array") {
        if(!Array.isArray(sendCheckDef)) {
            errors.push(errMess);
        }
    }
}