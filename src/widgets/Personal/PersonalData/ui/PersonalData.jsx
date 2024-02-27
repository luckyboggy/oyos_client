import React from "react";
import { useScreenSize } from "shared/lib/hooks/useScreenSize";
import { CustomInput } from "shared/ui/input/CustomInput";
import { Text } from "shared/ui/text/Text";
import cls from "./PersonalData.module.scss";

export const PersonalData = ({
  user,
  personal,
  setPersonal,
  withBirthData = false,
  withPhone = false,
}) => {
  const isMd = useScreenSize().isMd;

  return (
    <div className={cls.personalData}>
      <div className={cls.dataItem}>
        {isMd && (
          <div className={cls.dataTitle}>
            <Text size={"s"}>Эл. почта</Text>
          </div>
        )}
        <CustomInput
          type="email"
          size={"m"}
          placeholder={user.user.email ? user.user.email : "email"}
          onChange={(event) =>
            setPersonal({ ...personal, email: event.target.value })
          }
          value={user.user.email ? user.user.email : personal.email}
          readOnly={user.isAuth ? true : false}
        />
      </div>

      <div className={cls.dataItem}>
        {isMd && (
          <div className={cls.dataTitle}>
            <Text size={"s"}>Имя</Text>
          </div>
        )}
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
        {isMd && (
          <div className={cls.dataTitle}>
            <Text size={"s"}>Фамилия</Text>
          </div>
        )}
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
      {withBirthData && (
        <div className={cls.dataItem}>
          {isMd && (
            <div className={cls.dataTitle}>
              <Text size={"s"}>Дата рождения</Text>
            </div>
          )}
          <CustomInput
            type="date"
            placeholder="Дата рождения"
            size={"m"}
            //value={}
          />
        </div>
      )}
    </div>
  );
};
