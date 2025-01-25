import Comment from '../entities/comment/query.js'

const commentDB = new Comment();

export const getArticleComments = async (article) => {
    return await commentDB.find({article, approved: true}, {}, {skip: 0, limit: 3})
}

export const getComment = async (_id) => {
    return commentDB.get(_id, {}, {})
}

export const getUserComments = async (user) => {
    return await commentDB.find({user, approved: true}, {}, {skip: 0, limit: 3})
}
