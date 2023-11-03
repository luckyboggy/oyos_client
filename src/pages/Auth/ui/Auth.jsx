import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SignInForm } from "widgets/Sigh/ui/SignIn/SignInForm";
import { SignUpForm } from "widgets/Sigh/ui/SignUp/SignUpForm";
import {
  LOGIN_ROUTE,
  MAINPAGE_ROUTE,
  REGISTRATION_ROUTE,
} from "app/utils/consts";
import { login, registration } from "http/userAPI.js";
import { Context } from "index.js";
import { observer } from "mobx-react-lite";
import cls from "./Auth.module.scss";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const isLogin = location.pathname.substring(1) === "login";
  const navigate = useNavigate();

  const [authUser, setAuthUser] = useState({
    email: "",
    password: "",
  });

  const signClick = async (email, password) => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      user.setUser(data);
      user.setIsAuth(true);
      setAuthUser({
        email: "",
        password: "",
      });
      navigate("../" + MAINPAGE_ROUTE);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className={cls.auth}>
      <div className={cls.wrapper}>
        <div className={cls.choose}>
          <Link
            className={`${cls.chooseBtn} ${isLogin ? cls.chooseActive : ""}`}
            to={"../" + LOGIN_ROUTE}
          >
            вход
          </Link>
          <Link
            className={`${cls.chooseBtn} ${isLogin ? "" : cls.chooseActive}`}
            to={"../" + REGISTRATION_ROUTE}
          >
            регистрация
          </Link>
        </div>
        <div className={cls.authForm}>
          {isLogin ? (
            <SignInForm
              authUser={authUser}
              setAuthUser={setAuthUser}
              signClick={signClick}
            />
          ) : (
            <SignUpForm
              authUser={authUser}
              setAuthUser={setAuthUser}
              signClick={signClick}
            />
          )}
        </div>
      </div>
    </div>
  );
});

export { Auth };
