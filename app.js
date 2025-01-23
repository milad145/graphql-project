import express from "express";
import {createHandler} from 'graphql-http/lib/use/express';
import {buildSchema} from 'graphql'

import {ruruHTML} from 'ruru/server';
import mongoose from "mongoose";
import {findArticles, getArticle} from "./libs/services/article.js";
import {findUsers, getUser} from "./libs/services/user.js";
import {findComments} from "./libs/services/comment.js";

const initiateExpress = () => {

    const schema = buildSchema(`
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

    const rootValue = {
        articles: (args) => {
            let {page, limit} = args
            page = page || 1;
            limit = limit || 10
            return findArticles(page, limit)
        },
        article: async (args) => getArticle(args._id),
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

    const app = express();

    app.all("/main", createHandler({
        schema,
        rootValue
    }))

    app.get('/', (_req, res) => {
        res.type('html');
        res.end(ruruHTML({endpoint: '/main'}));
    });

    app.listen(4000, () => console.log("Running on port 4000"));

}

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb://0.0.0.0:27017/graphql");

        console.log(`MongoDB Connected: ${conn.connection.host}`);
        initiateExpress();
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};
(async () => {
    try {
        await connectDB()
    } catch (error) {
        console.error(error)
    }
})()
