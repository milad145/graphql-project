import express from "express";
import {createHandler} from 'graphql-http/lib/use/express';
import {buildSchema} from 'graphql'

import {ruruHTML} from 'ruru/server';
import mongoose from "mongoose";
import {findArticles, getArticle} from "./libs/services/article.js";

const initiateExpress = () => {

    const schema = buildSchema(`
    type Query {
        articles: [Article]
        article: Article
    }
    
    type Article {
        body: String
        title: String
    }
`)

    const rootValue = {
        articles: () => findArticles(),
        article: () => getArticle("5c46c0d169720e4bc0d05cde")
    }

    const app = express();

    app.all("/milad", createHandler({
        schema,
        rootValue
    }))

    app.get('/', (_req, res) => {
        res.type('html');
        res.end(ruruHTML({endpoint: '/milad'}));
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

connectDB().then().catch(err => console.error(err))
