import express from "express";
import {createHandler} from "graphql-http/lib/use/express";
import {ruruHTML} from "ruru/server";

import graphqlSchema from "./graphql/schema.js";
import {rootValue} from "./graphql/rootValue.js";

export const initiateExpress = () => {

    const app = express();

    app.all("/main", createHandler({
        schema: graphqlSchema,
        rootValue
    }))

    app.get('/', (_req, res) => {
        res.type('html');
        res.end(ruruHTML({endpoint: '/main'}));
    });

    app.listen(4000, () => console.log("Running on port 4000"));

}
