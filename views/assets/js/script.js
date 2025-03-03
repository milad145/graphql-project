let accessToken = null
let refreshToken = null;

function request(body) {
    return fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify(body)
    })
        .then(res => res.json())
        .then(result => {
            const {data, errors} = result;
            if (errors)
                throw errors
            return result;
        })
}

const userFragment = `
            fragment userFields on User{
              _id
              name
              email
              age
              address
              comments{
                _id
                comment
                createdAt
              }
              articles{
                _id
                title
                createdAt
              }
            }
`

const commentFragment = `
            fragment commentFields on Comment{
              _id
              comment
              createdAt
              user{
                ...userFields
              }
            }
`

const articleFragment = `
            fragment newArticleFields on Article{
              _id
              title
              body
              createdAt
              updatedAt
              user{
                ...userFields
              }
              comments{
                ...commentFields
              }
              
            }
`

async function getUsers() {
    try {
        let body = {
            query: `
        fragment userFields on User {
          _id
          name
          email
          admin
          age
        }
        query GetUser($userA: String!, $userB: String!) {
            firstUser: user(_id: $userA) {
            ...userFields
            articles {
              _id
              title
              comments {
                  _id
                  comment
                  user{
                    ...userFields
                  }
                }
            }
            comments {
              _id
              comment
              article {
                _id
                title
              }
            }
        }
          secondUser: user(_id: $userB) {
            ...userFields
          }
        }
        `,
            variables: {
                "userA": "5c46c0d169720e4bc0d05cdb",
                "userB": "5c46c0d169720e4bc0d05cda"
            }
        }
        let result = await request(body);
        console.log(result)
    } catch (e) {
        console.error(e)
    }
}

async function addArticle(accessToken) {
    try {
        let body = {
            query: `
            ${userFragment}
            ${commentFragment}
            ${articleFragment}
            mutation publishArticle($title: String!,$body: String!){
              addArticle(title:$title, body: $body){
                ...newArticleFields
              }
            }
     
        `,
            variables: {
                "title": "test title",
                "body": "Lorem ipsume is a ..."
            }
        }
        const {data} = await request(body);
        return data.addArticle
    } catch (e) {
        console.error(e)
    }
}

async function updateArticle(_id) {
    try {
        let body = {
            query: `
            ${userFragment}
            ${commentFragment}
            ${articleFragment}
                mutation updateArticle($_id: String!, $title: String, $body: String){
                  updateArticle(_id:$_id, title:$title, body:$body){
                    ...newArticleFields
                  }
                }
        `,
            variables: {
                _id,
                "title": "test title (updated!)",
                "body": "Lorem ipsume is a ... (updated!)"
            }
        }
        const {data} = await request(body);
        return data.updateArticle;
    } catch (e) {
        console.error(e)
    }
}

async function deleteArticle(_id) {
    try {
        let body = {
            query: `
                mutation deleteArticle($_id: String!){
                  deleteArticle(_id:$_id)
                }
        `,
            variables: {
                _id,
                "title": "test title",
                "body": "Lorem ipsume is a ..."
            }
        }
        const {data} = await request(body);
        return data.deleteArticle
    } catch (e) {
        console.error(e)
    }
}

async function registerUser(name, age, address, email, password) {
    try {
        let body = {
            query: `
            mutation register($name: String!, $age: Int!, $address: String!, $email:String!, $password: String!){
                register(name:$name, age: $age, address: $address, email: $email, password: $password){
                    accessToken
                    refreshToken
                }
            }
     
        `,
            variables: {name, age, address, email, password}
        }
        const {data} = await request(body);

        return data.register
    } catch (e) {
        console.error(e)
    }
}

async function login(email, password) {
    try {
        let body = {
            query: `
            
                mutation login($email:String!, $password: String!){
                    login(email: $email, password: $password){
                        accessToken
                        refreshToken
                    }
                }
     
        `,
            variables: {email, password}
        }
        const {data} = await request(body);

        return data.login
    } catch (e) {
        console.error(e)
    }
}

(async () => {

    const email = "miladaslani1991@gmail.com"
    const password = "ldghn1450719910"
    const user = await login(email, password)
    accessToken = user.accessToken;
    refreshToken = user.refreshToken

    let article = await addArticle()
    console.log({article})

    if (article) {
        let updatedArticle = await updateArticle(article._id)
        console.log({updatedArticle})
        let deletedArticle = await deleteArticle(article._id)
        console.log({deletedArticle})
    }
})()
