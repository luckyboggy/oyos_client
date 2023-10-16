import React from "react";
import { Link } from "react-router-dom";
import { CustomButton } from "shared/ui/button/CustomButton.jsx";
import { Text } from "shared/ui/text/Text";
import cls from "./ToLogin.module.scss";

const ToLogin = ({ close }) => {
  return (
    <div className={cls.toLogin}>
      <div className={cls.toAuth}>
        <Text size={"m"} position={"center"} padding={"pv1"}>
          Избранное
        </Text>
        
        <Text size={"s"} position={"left"} padding={"pv4_2"}>
          Войдите в аккаунт, чтобы смотреть избранное на любом устройстве
        </Text>
        <Link to="/login">
          <CustomButton fontSize={"s"} onClick={() => close(false)}>
            Войти
          </CustomButton>
        </Link>
      </div>
    </div>
  );
};

export { ToLogin };
