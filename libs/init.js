import express from "express";
import {createHandler} from "graphql-http/lib/use/express";
import {ruruHTML} from "ruru/server";

import graphqlSchema from "./graphql/schema.js";
import {rootValue} from "./graphql/rootValue.js";

export const initiateExpress = (config) => {

    const app = express();

    app.all("/main", createHandler({
        schema: graphqlSchema,
        rootValue
    }))

    app.get('/', (_req, res) => {
        res.type('html');
        res.end(ruruHTML({endpoint: '/main'}));
    });

    app.listen(config.port, () => console.log(`Running on http://localhost:${config.port}`));

}
