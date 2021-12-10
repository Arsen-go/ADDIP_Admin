import React from "react";
import API from "../api/axios";
import axios from "axios";
import config from "../config.json";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_FAILURE":
      return { ...state, isAuthenticated: false }
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

// ###########################################################

async function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  if (!!login && !!password) {
    console.log(API.signInAdmin)
    const { data } = await axios.post(config.server, {
      query: API.signInAdmin,
      variables: {
        email: login,
        password
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log(data)
    if (data.data && data.data.signInAdmin != null) {
      localStorage.setItem('authToken', data.data.signInAdmin.authToken)
      setError(null)
      setIsLoading(false)
      dispatch({ type: 'LOGIN_SUCCESS' })
      history.push('/app/dashboard')
    } else {
      // dispatch({ type: "LOGIN_FAILURE" });
      setError(true);
      setIsLoading(false);
    }
  } else {
    dispatch({ type: "LOGIN_FAILURE" });
    setError(true);
    setIsLoading(false);
  }
}

function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
