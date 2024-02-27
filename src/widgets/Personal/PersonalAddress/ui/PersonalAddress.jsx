import React from "react";
import { useScreenSize } from "shared/lib/hooks/useScreenSize";
import { CustomInput } from "shared/ui/input/CustomInput";
import { Text } from "shared/ui/text/Text";
import cls from "./PersonalAddress.module.scss";

export const PersonalAddress = ({ address, setAddress }) => {
  const isMd = useScreenSize().isMd;
  return (
    <div className={cls.personalAddress}>
      <div className={cls.dataItem}>
        {isMd && (
          <div className={cls.dataTitle}>
            <Text size={"s"}>Населенный пункт</Text>
          </div>
        )}
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
      {/* Способ доставки / delivery method */}
      {/* выбор улицы */}
      <div className={cls.dataItem}>
        {isMd && (
          <div className={cls.dataTitle}>
            <Text size={"s"}>Улица</Text>
          </div>
        )}
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
        <div className={cls.dataItem}>
          {isMd && (
            <div className={cls.dataTitle}>
              <Text size={"s"}>Дом</Text>
            </div>
          )}
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
        </div>
        <div className={cls.dataItem}>
          {isMd && (
            <div className={cls.dataTitle}>
              <Text size={"s"}>Квартира/Офис</Text>
            </div>
          )}
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
    </div>
  );
};
