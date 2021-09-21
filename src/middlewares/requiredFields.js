/** middleware for body,query,params validation and checking */
const { requiredBody } = require("../config/requiredBody");
const { validationRgex } = require("../config/validationRegx");
const { errorResponse, isValidDate } = require("../helper");
module.exports.requiredFields = (req, res, next) => {
    // get the url sub route so we can search inside the required fields and validate it
    let url = req.originalUrl.substring(1);
    // url = url.replace(/\//g, '_');

    let method = req.method.toLowerCase();
    url = `${method}_${url}`

    if (req.params.id) {
        url += '_one'
    }


    let { body, query, params } = req
    let allFields = {};
    if (body && Object.keys(body).length !== 0 && body.constructor === Object) {
        allFields = { ...allFields, ...body }
    }
    if (query && Object.keys(query).length !== 0 && query.constructor === Object) {
        allFields = { ...allFields, ...query }
    }
    if (params && Object.keys(params).length !== 0 && params.constructor === Object) {
        allFields = { ...allFields, ...params }
    }

    console.log(url, allFields)

    // ------------------  validate to all fields  -------------------
    if (!requiredBody[url]) {
        // if not found then return failed to find the required url
        return errorResponse(`failed to find the required fields for this API`, 404, res)

    }
    const keys = Object.keys(requiredBody[url]);
    for (let i in keys) {
        if (validationRgex[keys[i]]) {
            console.log(keys[i], validationRgex[keys[i]].toString())

            if (validationRgex[keys[i]].toString().indexOf('/') > -1) {

                // get the test regex for that field
                let testRegex = new RegExp(validationRgex[keys[i]]);
                if (requiredBody[url][keys[i]] == true && (allFields[keys[i]] == null || allFields[keys[i]] == undefined))
                    return errorResponse(`please enter the required '${keys[i]}' field`, 404, res)
                else if (allFields[keys[i]] && !testRegex.test(allFields[keys[i]])) {
                    return errorResponse(`please enter valid ${keys[i]}`, 404, res)
                }
            }
            else if (validationRgex[keys[i]] == 'date') {
                // there is no regex for that field then it must be a javascript date object field
                console.log('Im date')

                allFields[keys[i]] = new Date(allFields[keys[i]])

                if (!isValidDate(allFields[keys[i]])) {
                    return errorResponse(`please enter valid javascript date for ${keys[i]}`, 404, res)
                }
            } else if (validationRgex[keys[i]] == 'object') {
                if (allFields[keys[i]] !== 'object' && allFields[keys[i]] !== null) {
                    return errorResponse(`please enter value of object for '${keys[i]}' field`, 404, res)

                }
            } else if (validationRgex[keys[i]] == 'array') {
                console.log('Im array')
                if (!Array.isArray(allFields[keys[i]])) {
                    return errorResponse(`please enter value of array for '${keys[i]}' field`, 404, res)

                }

            }
        }

    }

    // ------------------  Remove all not used fields -------------------
    const bodyKeys = Object.keys(allFields);
    for (let i in bodyKeys) {
        if (!requiredBody[url][bodyKeys[i]]) {
            delete allFields[bodyKeys[i]];
        }
    }

    next();
}