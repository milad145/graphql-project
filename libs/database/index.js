import QueryModel from './query.js'

import article from './models/article.js'
import comment from './models/comment.js'
import user from './models/user.js'

const articleModel = new QueryModel(article);
const commentModel = new QueryModel(comment);
const userModel = new QueryModel(user);

export {articleModel, commentModel, userModel}
