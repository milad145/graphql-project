function request(body) {
    return fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
        .then(res => res.json())
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

async function addArticle() {
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
        const {data, errors} = await request(body);
        if (errors)
            throw errors

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
        const {data, errors} = await request(body);
        if (errors)
            throw errors

        return data.login
    } catch (e) {
        console.error(e)
    }
}

(async () => {
    // let article = await addArticle()
    // console.log({article})
    // let updatedArticle = await updateArticle(article._id)
    // console.log({updatedArticle})
    // let deletedArticle = await deleteArticle(article._id)
    // console.log({deletedArticle})

    const userData = {
        name: "mehran",
        age: 31,
        address: "Ardabil, Iran",
        email: "mehran@gmail.com",
        password: "ldghn145"
    }
    const {name, age, address, email, password} = userData;
    let user = await registerUser(name, age, address, email, password)
    console.log(user)
    let loginData
    try {
        await login(email, "test")
    } catch (e) {
        console.error(e)
    }
    loginData = await login(email, password)
    console.log(loginData)
})()
