import React from "react";
import { CustomInput } from "shared/ui/input/CustomInput";
import { CustomButton } from "shared/ui/button/CustomButton";
import cls from "./SignInForm.module.scss";

const SignInForm = ({ authUser, setAuthUser, signClick }) => {
  return (
    <form className={cls.signInForm}>
      <CustomInput
        type="email"
        placeholder="email"
        size={"m"}
        value={authUser.email}
        onChange={(event) =>
          setAuthUser({ ...authUser, email: event.target.value })
        }
      />
      <CustomInput
        type="password"
        placeholder="пароль"
        size={"m"}
        value={authUser.password}
        onChange={(event) =>
          setAuthUser({ ...authUser, password: event.target.value })
        }
      />
      <div className={cls.resetPass}>
        <a href="/#">Восстановить пароль</a>
      </div>

      <div className={cls.btns}>
        <CustomButton
          type="submit"
          fontSize={"s"}
          onClick={(event) => {
            event.preventDefault();
            signClick(authUser.email, authUser.password);
          }}
        >
          Войти
        </CustomButton>
      </div>
    </form>
  );
};

export { SignInForm };
