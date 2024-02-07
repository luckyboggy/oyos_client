import React from "react";
import { useScreenSize } from "shared/lib/hooks/useScreenSize";
import { CustomInput } from "shared/ui/input/CustomInput";
import cls from "./PersonalData.module.scss";

export const PersonalData = ({ user, personal, setPersonal }) => {
  return (
    <div className={cls.personalData}>
      <div className={cls.dataItem}>
        {useScreenSize().isMd && <div className={cls.dataTitle}>Эл. почта</div>}
        <CustomInput type="email" size={"m"} value={user.user.email} readonly />
      </div>

      <div className={cls.dataItem}>
        {useScreenSize().isMd && <div className={cls.dataTitle}>Имя</div>}
        <CustomInput
          type="text"
          placeholder={user.user.name ? user.user.name : "Имя"}
          size={"m"}
          value={personal.name}
          onChange={(event) =>
            setPersonal({ ...personal, name: event.target.value })
          }
        />
      </div>

      <div className={cls.dataItem}>
        {useScreenSize().isMd && <div className={cls.dataTitle}>Фамилия</div>}
        <CustomInput
          type="text"
          placeholder={user.user.surename ? user.user.surename : "Фамилия"}
          size={"m"}
          value={personal.surename}
          onChange={(event) =>
            setPersonal({ ...personal, surename: event.target.value })
          }
        />
      </div>

      <div className={cls.dataItem}>
        {useScreenSize().isMd && (
          <div className={cls.dataTitle}>Дата рождения</div>
        )}
        <CustomInput
          type="date"
          placeholder="Дата рождения"
          size={"m"}
          //value={}
        />
      </div>
    </div>
  );
};
