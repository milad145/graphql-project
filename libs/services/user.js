import {userModel} from "../database/index.js";

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
