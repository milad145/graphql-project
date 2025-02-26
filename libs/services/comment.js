import {commentModel} from "../database/index.js";

export const getArticleComments = async (article) => {
    return await commentModel.find({article, approved: true}, {}, {skip: 0, limit: 3})
}

export const getComment = async (_id) => {
    return commentModel.get(_id, {}, {})
}

export const getUserComments = async (user) => {
    return await commentModel.find({user, approved: true}, {}, {skip: 0, limit: 3})
}
