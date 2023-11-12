import React, { useContext, useState } from "react";
import { Context } from "index.js";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "app/utils/consts";
import { change } from "http/userAPI";
import { CustomButton } from "shared/ui/button/CustomButton";
import { observer } from "mobx-react-lite";
import cls from "./UserPersonal.module.scss";
import { PersonalData } from "widgets/Personal/PersonalData";

const UserPersonal = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [newPersonal, setNewPersonal] = useState({
    name: "",
    surename: "",
    phone: "",
  });

  const exit = () => {
    user.setUser({});
    user.setIsAuth(false);
    window.localStorage.removeItem("jsonWebToken");
    window.localStorage.removeItem("alreadyliked");
    window.localStorage.removeItem("localFavorites");
    window.localStorage.removeItem("localBasket");
    navigate("../" + LOGIN_ROUTE);
  };

  const changePersonal = () => {
    change(
      user.user.email,
      newPersonal.name,
      newPersonal.surename,
      newPersonal.phone
    ).then((data) => {
      user.setUser(data);
    });
  };

  console.log(user.user);

  return (
    <div className={cls.personal}>
      <PersonalData
        user={user}
        personal={newPersonal}
        setPersonal={setNewPersonal}
      />

      <div className={cls.btns}>
        <CustomButton fontSize={"s"} onClick={changePersonal}>
          Сохранить
        </CustomButton>
        <CustomButton
          onClick={() => exit()}
          fontSize={"s"}
          theme={"inverted"}
          margins={"mt1"}
        >
          Выход
        </CustomButton>
      </div>
    </div>
  );
});

export { UserPersonal };
