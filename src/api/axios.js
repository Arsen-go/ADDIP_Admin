
const API = {
    headers: {
        'Content-Type': 'application/json',
        'authentication': `Bearer ${localStorage.getItem('authToken')}`,
    },

    signInAdmin: `mutation signInAdmin($email: String!, $password: String!,) {
        signInAdmin(email: $email, password: $password){
        authToken
      }
    }`
}

module.exports = API;