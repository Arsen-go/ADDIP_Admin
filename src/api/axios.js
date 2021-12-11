
const API = {
    headers: {
        'Content-Type': 'application/json',
        'authentication': `Bearer ${localStorage.getItem('authToken')}`,
    },

    signInAdmin: `mutation signInAdmin($email: String!, $password: String!,) {
        signInAdmin(email: $email, password: $password){
        authToken
      }
    }`,

    getUsers: `query getUsers($limit: Float!, $skip: Float!,) {
        getUsers(limit: $limit, skip: $skip){
        id
        birthDate
        firstName
        lastName
        email
      }
    }`
}

module.exports = API;