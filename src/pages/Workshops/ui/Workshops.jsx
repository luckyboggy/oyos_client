import React from "react";
import { Text } from "shared/ui/text/Text";
import cls from "./Workshops.module.scss";

const Workshops = () => {
  return (
    <div className={cls.workshops}>
      <Text size={"m"} position={"center"}>
        Скоро сдесь будет интересно
      </Text>
    </div>
  );
};

export { Workshops };
