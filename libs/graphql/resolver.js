import {
    addArticle,
    findArticles,
    getArticle,
    getUserArticles,
    updateArticle,
    deleteArticle
} from "../services/article.js";
import {findUsers, getUser} from "../services/user.js";
import {getArticleComments, getComment, getUserComments} from "../services/comment.js";

export const resolvers = {
    Query: {
        article: async (_, {_id}) => getArticle(_id),
        articles: (_, {page, limit}) => {
            page = page || 1;
            limit = limit || 10
            return findArticles({}, page, limit)
        },
        user: async (_, {_id}) => await getUser(_id),
        users: (_, {page, limit}) => {
            page = page || 1;
            limit = limit || 10
            return findUsers(page, limit)
        },
        comment: async (_, {_id}) => await getComment(_id)
    },
    Mutation: {
        addArticle: async (_, {title, body}) => {
            let user = "5c46c0d169720e4bc0d05cbe"
            return await addArticle(user, title, body)
        },
        updateArticle: async (_, {_id, title, body}) => {
            let article = await updateArticle(_id, title, body)
            if (!article)
                throw new Error('article not found!')

            return article
        },
        deleteArticle: async (_, {_id}) => await deleteArticle(_id)
    },
    User: {
        articles: async ({_id}) => await getUserArticles(_id),
        comments: async ({_id}) => await getUserComments(_id)
    },
    Article: {
        user: async ({user}) => await getUser(user),
        comments: async ({_id}) => await getArticleComments(_id)
    },
    Comment: {
        user: async ({user}) => await getUser(user),
        article: async ({article}) => await getArticle(article),
    },
}
