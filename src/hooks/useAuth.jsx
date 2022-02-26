import axios from "axios";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Loader from "../components/common/loader";
import {
  setTokens,
  getAccessToken,
  removeAuthData,
} from "../service/localStorage.service.js";
import usersService from "../service/user.service";

const AuthContext = React.createContext();

export const httpAuth = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/",
  params: { key: process.env.REACT_APP_API_KEY },
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const history = useHistory();
  const [currentUser, setUser] = useState();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function logIn({ email, password }) {
    try {
      const { data } = await httpAuth.post(`accounts:signInWithPassword`, {
        email,
        password,
        returnSecureToken: true,
      });
      setTokens(data);
      await getUserData();
    } catch (error) {
      errorCatcher(error);
      const { message, code } = error.response.data.error;
      if (code === 400) {
        if (message === "INVALID_PASSWORD" || message === "EMAIL_NOT_FOUND") {
          throw new Error("Email или пароль введены некорректно");
        }
      }
    }
  }

  async function signUp({ email, password, ...rest }) {
    try {
      const { data } = await httpAuth.post(`accounts:signUp`, {
        email,
        password,
        returnSecureToken: true,
      });
      setTokens(data);
      await createUser({ userId: data.localId, email, ...rest });
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        if (message === "EMAIL_EXISTS") {
          const errorObj = {
            email: "Пользователь с таким Email уже существует",
          };

          throw errorObj;
        }
      }
    }
  }
  async function getUserData() {
    try {
      const { content } = await usersService.getCurrentUser();
      setUser(content);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setLoading(false);
    }
  }
  function logOut() {
    removeAuthData();
    setUser(null);
    history.push("/");
  }

  useEffect(() => {
    if (getAccessToken()) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, []);

  async function createUser(data) {
    try {
      const { content } = await usersService.create(data);
      setUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  }
  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }
  return (
    <AuthContext.Provider
      value={{ signUp, logIn, currentUser, logOut, isLoading }}
    >
      {!isLoading ? children : <Loader />}
    </AuthContext.Provider>
  );
};
