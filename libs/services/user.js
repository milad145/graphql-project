import User from '../entities/user/query.js'

const userDB = new User();

export const findUsers = async (page, limit) => {
    const skip = (page - 1) * limit;
    let users = await userDB.find({}, {}, {limit, skip})
    let count = await userDB.count({})
    return {
        users,
        paginate: {count, limit, page, pages: Math.ceil(count / limit)}
    }
}

export const getUser = async (_id) => {
    return userDB.get(_id, {}, {})
}
