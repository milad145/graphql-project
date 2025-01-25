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

(async () => await getUsers())()
