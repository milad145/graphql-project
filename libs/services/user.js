import {userModel} from "../database/index.js";
import {generateJWTToken} from "../modules/assist.js"
import {errorCode} from "../modules/errorHandler.js";

export const findUsers = async (page, limit) => {
    const skip = (page - 1) * limit;
    let users = await userModel.find({}, {}, {limit, skip})
    let count = await userModel.count({})
    return {
        users,
        paginate: {count, limit, page, pages: Math.ceil(count / limit)}
    }
}

export const getUser = async (_id) => {
    return userModel.get(_id, {}, {})
}

export const register = async (name, age, address, email, password) => {
    try {
        const userObj = {name, age, address, email, password}
        const user = await userModel.create(userObj);
        const accessToken = generateJWTToken('access', {_id: user['_id']});
        const refreshToken = generateJWTToken('refresh', {_id: user['_id']});
        return {accessToken, refreshToken};
    } catch (e) {
        if (e && e.code && e.code === 11000)
            throw errorCode(2001)

        throw e;
    }
}

export const login = async (email, password) => {
    const user = await userModel.getByQuery({email}, {password: 1})

    if (!user)
        throw errorCode(2002)

    let passwordIsMatch = await user.comparePassword(password)
    if (!passwordIsMatch)
        throw errorCode(2003)

    const accessToken = generateJWTToken('access', {_id: user['_id']});
    const refreshToken = generateJWTToken('refresh', {_id: user['_id']});
    return {accessToken, refreshToken};
}
