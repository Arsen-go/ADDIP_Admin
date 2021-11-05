
const API = {
    headers: {
        'Content-Type': 'application/json',
        'authentication': `Bearer ${localStorage.getItem('authToken')}`,
    },

    signIn: `mutation signInAdmin($email: String!, $password: String! ) {
        signInAdmin(email: $email, password: $password ){
            authToken
        }
      }`,

    createAttachment: `mutation createAttachment($id: String!, $contentType: String, $name: String) {
      createAttachment(id: $id, contentType: $contentType, name : $name){
        id
        uploadLink
        name
        durationSeconds
        contentType
        downloadLink
      }
    }`
}

module.exports = API;