import express from "express";
import {createHandler} from 'graphql-http/lib/use/express';
import {buildSchema} from 'graphql'

import {ruruHTML} from 'ruru/server';


const schema = buildSchema(`
    type Query {
        name: String
        age: Int
        catArray: [Category]
        catObj: Category
    }
    
    type Category {
        name: String
        type: String
        isMale: Boolean
    }
`)

const rootValue = {
    name: () => 'milad',
    age: () => 33,
    catArray: () => {
        return [{name: 'test', type: 'bplus', isMale: true}, {name: 'test2', type: 'aplus'}]
    },
    catObj: () => {
        return {name: 'test', type: 'bplus', isMale: false}
    }
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

app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
