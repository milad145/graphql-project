import {findArticles, getArticle} from "../services/article.js";
import {findUsers, getUser} from "../services/user.js";
import {findComments} from "../services/comment.js";

export const rootValue = {
    articles: ({page, limit}) => {
        page = page || 1;
        limit = limit || 10
        return findArticles(page, limit)
    },
    article: async ({_id}) => getArticle(_id),
    users: ({page, limit}) => {
        page = page || 1;
        limit = limit || 10
        return findUsers(page, limit)
    },
    user: async ({_id}) => {
        let user = await getUser(_id)
        if (!user) {
            let err = new Error()
            err.messageCode = 1001
            err.responseCode = 404
            err.message = 'user not founded!!'
            throw err
        }
        return user
    },
    comments: async ({article, page, limit}) => {
        page = page || 1;
        limit = limit || 10;
        return findComments(article, page, limit)
    }
}
