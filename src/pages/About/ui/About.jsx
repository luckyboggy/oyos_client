import React from "react";
import { Text } from "shared/ui/text/Text";
import cls from "./About.module.scss";

const About = () => {
  return (
    <div className={cls.about}>
      <Text size={"m"} position={"left"}>
        О нас
      </Text>
    </div>
  );
};

export default About;
