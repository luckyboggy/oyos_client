import React from "react";
import { CustomInput } from "shared/ui/input/CustomInput";
import { Text } from "shared/ui/text/Text";
import cls from "./SearchPage.module.scss";

export const SearchPage = () => {
  return (
    <div className={cls.searchPage}>
      <Text size={"m"} position={"center"} padding={"pv1"}>
        Результаты поиска
      </Text>
      <div className={cls.searchQuery}></div>
      <div className={cls.lastQuery}></div>
      <div className={cls.searchResults}></div>
    </div>
  );
};
