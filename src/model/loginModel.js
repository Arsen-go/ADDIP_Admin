import axios from "axios";
import mutationAPI from "../rest/mutation";
import config from "../config.json";
import { Redirect } from 'react-router-dom'

class LoginModel {
    async signIn(email, password) {
        try {
            if (!email && !password) {
                return { error: "Email or password is not written." };
            }
            const { data } = await axios.post(config.server, {
                query: mutationAPI.signIn,
                variables: {
                    email,
                    password
                }
            })
            if (data.errors && data.errors.length) {
                return { error: data.errors[0].message };
            }
            if (data && data.data.signInAdmin) {
                alert()
                localStorage.setItem("authToken", data.data.signInAdmin.authToken);
                // window.location.href = "/home";
                return  window.location.href = "/#/dashboard"
            }
            return { error: null, data: data };
        } catch (error) {
            return { error: error.message };
        }
    };
}

export default LoginModel;