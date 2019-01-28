const crypto = require('crypto');
const moment = require('moment-timezone');
require('dotenv').config();
exports.authorize = (req, res, next) => {
    const errorStatus = 422;
    const errorMessage = 'Invalid token';
    // To check request headers have token
    if(!req.headers.authorization) {
        const error = new Error('Token not found');
        error.status = errorStatus;
        return next(error);
    }
    const header = req.headers.authorization.split(' ');    // Split Authorization token by space (Bearer 4D5FSD)
    if (typeof header[1] === 'undefined') { // if header token is not set then return error
        const error = new Error(errorMessage);
        error.status = errorStatus;
        return next(error);
    }

    const token = header[1];
    let token_decode = Buffer(token, 'base64').toString('binary'); // Token decode
    if(token_decode.length <= 0) {  // Check decoded token is exists
        const error = new Error(errorMessage);
        error.status = errorStatus;
        return next(error);
    }
    let mac = token_decode.substr(0,32);
    let message = token_decode.substr(32); 
    let calc = crypto.createHmac('sha256', process.env.AUTHORIZE_KEY)
                    .update(message)
                    .digest('binary');
    if(mac !== calc) {
        const error = new Error(errorMessage);
        error.status = errorStatus;
        return next(error);
    }
    message = JSON.parse(message);
    let currTime = moment().format('YYYY-MM-DD HH:mm:ss');
    let expireTime = moment(message.expires).format('YYYY-MM-DD HH:mm:ss');
    if (currTime > expireTime) {
        const error = new Error(errorMessage);
        error.status = errorStatus;
        return next(error);
    }
    next();    
}; 