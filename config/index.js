require('dotenv').config();
module.exports = {
    secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'secret',
    codeResponses: {
        200: {
            response: "OK"
        },
        201: {
            response: "Element Created"
        },
        400: {
            response: "Bad Request"
        },
        401: {
            response: "Unauthorized"
        },
        404: {
            response: "Not Found"
        },
        409: {
            response: "Conflict"
        },
        422:{
            response: "Unprocessable Entity"
        }

    }
};