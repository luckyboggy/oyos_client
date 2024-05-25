import React from "react";
import { Text } from "shared/ui/text/Text";
import cls from "./Delivery.module.scss";

const Delivery = () => {
  return (
    <div className={cls.delivery}>
      <Text size={"m"} position={"left"}>
        Доставка
      </Text>
    </div>
  );
};

export default Delivery;
