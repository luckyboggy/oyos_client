import React from "react";
import { useScreenSize } from "shared/lib/hooks/useScreenSize";
import { CustomInput } from "shared/ui/input/CustomInput";
import cls from "./PersonalAddress.module.scss";

export const PersonalAddress = ({ address, setAddress }) => {
  return (
    <div className={cls.personalAddress}>
      <div className={cls.dataItem}>
        {useScreenSize().isMd && <div className={cls.dataTitle}>Город</div>}
        <CustomInput
          type="text"
          placeholder={"Город"}
          size={"m"}
          value={address.city}
          onChange={(event) =>
            setAddress({ ...address, name: event.target.value })
          }
        />
      </div>

      {/* выбор улицы */}
      <div className={cls.dataItem}>
        {useScreenSize().isMd && <div className={cls.dataTitle}>Улица</div>}
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
      </div>

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
