import Comment from '../entities/comment/query.js'

const commentDB = new Comment();

export const findComments = async (article, page, limit) => {
    const skip = (page - 1) * limit;
    let result = await commentDB.find({article}, {}, {limit, skip})
    let count = await commentDB.count({article})
    return {
        result,
        paginate: {count, limit, page, pages: Math.ceil(count / limit)}
    }
}

export const getComment = async (_id) => {
    return commentDB.get(_id, {}, {})
}

