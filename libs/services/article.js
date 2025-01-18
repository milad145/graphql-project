import Article from '../entities/article/query.js'

const articleService = new Article();

export const findArticles = async () => {
    return articleService.find({}, {}, {})
}

export const getArticle = async (_id) => {
    return articleService.get(_id, {}, {})
}
