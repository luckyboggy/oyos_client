import React, { useContext } from "react";
import { CustomButton } from "shared/ui/button/CustomButton";
import { Context } from "index.js";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "app/utils/consts";
import cls from "./PersonalManagement.module.scss";

const PersonalManagement = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const exit = () => {
    user.setUser({});
    user.setIsAuth(false);
    window.localStorage.removeItem("jsonWebToken");
    window.localStorage.removeItem("alreadyliked");
    window.localStorage.removeItem("localFavorites");
    window.localStorage.removeItem("localBasket");
    navigate("../" + LOGIN_ROUTE);
  };

  return (
    <div className={cls.personal}>
      <div>{user.user.email}</div>
      <CustomButton onClick={() => exit()}>Выход</CustomButton>
    </div>
  );
};

export { PersonalManagement };
