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

### Run Project
1. clone the project

```
git clone https://github.com/milad145/graphql-project.git
```

2. go to the project directory

```
cd graphql-project
```

3. install all the dependencies

```
npm i
```

4. make a copy of `sapmle.env` and rename it to `.env`

```
cp sample.env .env
```

5. update the `.env` file parameters

```
DB_CONFIG : mongodb connection url
PORT : the port which app listen on it
ACCESS_TOKEN_SECRET : secret string for creating access token 
REFRESH_TOKEN_SECRET : secret string for creating refresh token
```

6. run the project with this command

```
npm run start
```
