export const typeDefs = `#graphql
type Query {
    article(_id: String!): Article
    articles(page: Int, limit: Int): ArticlesResult
    user(_id: String!): User
    users(page: Int, limit: Int): UsersResult
    comment(_id: String): Comment
}

type ArticlesResult {
    articles: [Article]
    paginate: Paginate
}

type UsersResult {
    users: [User]
    paginate: Paginate
}

type Paginate {
    count: Int
    limit: Int
    page: Int
    pages: Int
}

type User {
    _id: String
    name: String
    age: Int
    address: String
    admin: Boolean
    email: String
    comments: [Comment]
    articles: [Article]
    password: String
    createdAt: String
    updatedAt: String
}

type Article {
    _id: String
    user: User
    title: String
    body: String
    comments: [Comment]
    createdAt: String
    updatedAt: String
}

type Comment {
    _id: String
    user: User
    approved: Boolean
    article: Article
    comment: String
}
`;

