import {buildSchema} from 'graphql'


export default buildSchema(`
    type Query {
        articles(page: Int, limit: Int): ArticlesResult
        article(_id: String!): Article
        
        users(page: Int, limit: Int): UsersResult
        user(_id: String!): User
        
        comments(article: String!,page: Int, limit: Int): CommentsResult
    }
    
    type Paginate {
        count: Int
        limit: Int
        page: Int
        pages: Int
    }
    
    type Article {
        _id: String
        body: String
        title: String
        user: User
        comments: [Comment]
        createdAt: String
        updatedAt: String
    }
    
    type ArticlesResult {
        result : [Article]
        paginate: Paginate
    }
    
    type User {
        _id: String
        name: String
        age: Int
        email: String
        admin: Boolean
        createdAt: String
        updatedAt: String
        articles: [Article]
    }
    
    type UsersResult {
        result : [User]
        paginate: Paginate
    }
    
    type Comment {
        user : User
        approved : Boolean
        article : String
        comment : String
    }
    
    type CommentsResult {
        result : [Comment]
        paginate: Paginate
    }
`)
