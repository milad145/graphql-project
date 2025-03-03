# GraphQL Learning

An application which use ES6, GraphQl, Apollo Server, Express.js and Mongoose for handling client's request



### Files Structure
```
libs/
---- config/
---- ---- development.js
---- ---- index.js
---- ---- production.js
---- database/
---- ---- models/
---- ---- ---- article.js
---- ---- ---- comment.js
---- ---- ---- user.js
---- ---- sampleData/
---- ---- ---- article.metadata.json
---- ---- ---- comment.metadata.json
---- ---- ---- user.metadata.json
---- ---- index.js
---- ---- query.js
---- graphql/
---- ---- context.js
---- ---- index.js
---- ---- resolver.js
---- ---- schema.js
---- modules/
---- ---- assist.js
---- ---- errorHandler.js
---- ---- tokenGenerator.js
---- services/
---- ---- article.js
---- ---- comment.js
---- ---- user.js
---- init.js
views/
---- assets/
---- ---- js/
---- ---- ---- script.js
---- index.ejs
.gitignore
app.js
package.json
README.md
sample.env
```
