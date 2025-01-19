import Article from '../entities/article/query.js'

const articleDB = new Article();

export const findArticles = async (page, limit) => {
    const skip = (page - 1) * limit;
    let result = await articleDB.find({}, {}, {limit, skip, populate: true})
    let count = await articleDB.count({})
    return {
        result,
        paginate: {count, limit, page, pages: Math.ceil(count / limit)}
    }
}

export const getArticle = async (_id) => {
    return articleDB.get(_id, {}, {})
}
