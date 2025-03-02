import {articleModel} from "../database/index.js";
import {errorCode} from "../modules/errorHandler.js";

export const findArticles = async (query = {}, page, limit) => {
    const skip = (page - 1) * limit;
    let articles = await articleModel.find(query, {}, {limit, skip})
    let count = await articleModel.count(query)
    return {
        articles,
        paginate: {count, limit, page, pages: Math.ceil(count / limit)}
    }
}

export const getUserArticles = async (user) => {
    return await articleModel.find({user}, {}, {skip: 0, limit: 3})
}

export const getArticle = async (_id) => {
    return articleModel.get(_id, {}, {})
}

/**
 * add new article to database
 * @param user {!String}
 * @param title {!String}
 * @param body {!String}
 * @returns {Promise<*>}
 */
export const addArticle = async (user, title, body) => {
    return articleModel.create({user, title, body})
}

/**
 * /**
 * update article by _id
 * @param _id {!String}
 * @param title {String}
 * @param body {String}
 * @returns {Promise<*>}
 */
export const updateArticle = async (_id, title, body) => {
    let update = {}
    if (title)
        update.title = title;
    if (body)
        update.body = body;

    if (Object.keys(update).length)
        update = {$set: update}

    const article = await articleModel.update({_id}, update, {new: true});
    if(!article)
        throw errorCode(2101)

    return article
}

/**
 * delete article by id
 * @param _id {!String}
 * @returns {*}
 */
export const deleteArticle = async (_id) => {
    let {deletedCount} = await articleModel.delete(_id)
    return !!deletedCount;
}
