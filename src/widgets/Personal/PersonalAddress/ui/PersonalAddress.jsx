import React from "react";
import { CustomInput } from "shared/ui/input/CustomInput";
import cls from "./PersonalAddress.module.scss";

export const PersonalAddress = ({ address, setAddress }) => {
  return (
    <div className={cls.personalAddress}>
      <CustomInput
        type="text"
        placeholder={"Город"}
        size={"m"}
        value={address.city}
        onChange={(event) =>
          setAddress({ ...address, name: event.target.value })
        }
      />

      {/* выбор улицы */}
      <CustomInput
        type="text"
        placeholder={"Улица"}
        size={"m"}
        value={address.street}
        onChange={(event) =>
          setAddress({
            ...address,
            street: event.target.value,
          })
        }
      />
      <div className={cls.houseFlat}>
        <CustomInput
          type="text"
          placeholder={"Дом"}
          size={"m"}
          value={address.house}
          onChange={(event) =>
            setAddress({
              ...address,
              house: event.target.value,
            })
          }
        />
        <CustomInput
          type="text"
          placeholder={"Картира"}
          size={"m"}
          value={address.flat}
          onChange={(event) =>
            setAddress({
              ...address,
              flat: event.target.value,
            })
          }
        />
      </div>
    </div>
  );
};
