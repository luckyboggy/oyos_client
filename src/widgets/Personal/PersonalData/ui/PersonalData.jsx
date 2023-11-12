import React from "react";
import { CustomInput } from "shared/ui/input/CustomInput";
import cls from "./PersonalData.module.scss";

export const PersonalData = ({ user, personal, setPersonal }) => {
  return (
    <div className={cls.PersonalData}>
      <CustomInput type="email" size={"m"} value={user.user.email} readonly />
      <CustomInput
        type="text"
        placeholder={user.user.name ? user.user.name : "Имя"}
        size={"m"}
        value={personal.name}
        onChange={(event) =>
            setPersonal({ ...personal, name: event.target.value })
        }
      />
      <CustomInput
        type="text"
        placeholder={user.user.surename ? user.user.surename : "Фамилия"}
        size={"m"}
        value={personal.surename}
        onChange={(event) =>
            setPersonal({ ...personal, surename: event.target.value })
        }
      />
      <CustomInput
        type="date"
        placeholder="Дата рождения"
        size={"m"}
        //value={}
      />
    </div>
  );
};
