import http from 'http';
import path, {dirname} from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


import express from "express";
import {ApolloServer} from "@apollo/server";
import {expressMiddleware} from '@apollo/server/express4';
import {ApolloServerPluginLandingPageGraphQLPlayground} from '@apollo/server-plugin-landing-page-graphql-playground';


import {typeDefs, resolvers} from "./graphql/index.js";

export const initiateExpress = async (config) => {

    const app = express();
    app.set('view engine', 'ejs');


    app.use(express.json());

    const httpServer = http.createServer({}, app);

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground()
        ]
    });
    await server.start();

    app.use('/js', express.static(path.join(__dirname, '..', 'views', 'assets', 'js')));
    app.get('/viewer', (req, res) => res.render('index'))

    app.use(
        expressMiddleware(server)
    );

    httpServer.listen(config.port)
    console.log(`🚀 Server ready at http://localhost:${config.port}`);

}
