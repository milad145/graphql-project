import jwt from 'jsonwebtoken'

import config from '../config/index.js';

export const generateJWTToken = (type, data) => {
    data = JSON.parse(JSON.stringify(data))
    let secret = config[`${type}TokenSecret`];
    let expiresIn = config[`${type}TokenExpireTime`]
    if (secret && expiresIn) {
        return jwt.sign({data}, secret, {expiresIn})
    } else
        return ''
}
