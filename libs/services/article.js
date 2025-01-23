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
