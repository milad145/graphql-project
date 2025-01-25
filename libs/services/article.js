import Article from '../entities/article/query.js'

const articleDB = new Article();

export const findArticles = async (query = {}, page, limit) => {
    const skip = (page - 1) * limit;
    let articles = await articleDB.find(query, {}, {limit, skip})
    let count = await articleDB.count(query)
    return {
        articles,
        paginate: {count, limit, page, pages: Math.ceil(count / limit)}
    }
}

export const getUserArticles = async (user) => {
    return await articleDB.find({user}, {}, {skip: 0, limit: 3})
}

export const getArticle = async (_id) => {
    return articleDB.get(_id, {}, {})
}

/**
 * add new article to database
 * @param user {!String}
 * @param title {!String}
 * @param body {!String}
 * @returns {Promise<*>}
 */
export const addArticle = async (user, title, body) => {
    return articleDB.create({user, title, body})
}

/**
 * /**
 * update article by _id
 * @param _id {!String}
 * @param title {String}
 * @param body {String}
 * @returns {Promise<*>}
 */
export const updateArticle = (_id, title, body) => {
    let update = {}
    if (title)
        update.title = title;
    if (body)
        update.body = body;

    if (Object.keys(update).length)
        update = {$set: update}

    return articleDB.update({_id}, update, {new: true});
}

/**
 * delete article by id
 * @param _id {!String}
 * @returns {*}
 */
export const deleteArticle = async (_id) => {
    let {deletedCount} = await articleDB.delete(_id)
    return !!deletedCount;
}
