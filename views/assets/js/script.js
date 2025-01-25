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
        mutation publishArticle($title: String!,$body: String!){
          addArticle(title:$title, body: $body){
            _id
            title
            body
            createdAt
            updatedAt
            user{
              _id
              name
            }
            comments{
              _id
              comment
              user{
                _id
                name
              }
            }
          }
        }
        `,
            variables: {
                "title": "test title",
                "body": "Lorem ipsume is a ..."
            }
        }
        const {data} = await request(body);
        const article = data.addArticle
        console.log(article)
        await updateArticle(article._id)
        console.log('article updated!')
        await deleteArticle(article._id)
        console.log('article deleted!')
    } catch (e) {
        console.error(e)
    }
}

async function updateArticle(_id) {
    try {
        let body = {
            query: `
                mutation updateArticle($_id: String!, $title: String, $body: String){
                  updateArticle(_id:$_id, title:$title, body:$body){
                    _id
                    title
                    body
                    createdAt
                    updatedAt
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
        console.log(data)
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
        console.log(data)
    } catch (e) {
        console.error(e)
    }
}

(async () => await addArticle())()
