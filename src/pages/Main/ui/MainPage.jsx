import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useScreenSize } from "shared/lib/hooks/useScreenSize";
import { Text } from "shared/ui/text/Text";

import cls from "./MainPage.module.scss";

import mainImg01 from "shared/assets/img/jpg/main/Main01.jpg";
import mainImgDt01 from "shared/assets/img/jpg/main/mainImgDt01.jpg";
import mainImgDt01_small from "shared/assets/img/jpg/main/mainImgDt01_small.jpg";

import slide01 from "shared/assets/img/jpg/main/slider/slide01.jpg";
import slide02 from "shared/assets/img/jpg/main/slider/slide02.jpg";
import slide03 from "shared/assets/img/jpg/main/slider/slide03.jpg";
import slide04 from "shared/assets/img/jpg/main/slider/slide04.jpg";
import slide05 from "shared/assets/img/jpg/main/slider/slide05.jpg";
import slide06 from "shared/assets/img/jpg/main/slider/slide06.jpg";
import slide07 from "shared/assets/img/jpg/main/slider/slide07.jpg";

import { Slider } from "shared/ui/slider/Slider";
import Image from "shared/ui/image/Image";

const MainPage = () => {
  const windowInnerWidth = document.documentElement.clientWidth;
  const windowInnerHeight = document.documentElement.clientHeight;

  const isLg = useScreenSize().isLg;

  const sliderImages = [
    { img: slide02, description: "description02" }, //Кольца
    { img: slide01, description: "description01" }, //Сумки
    { img: slide03, description: "description03" }, //Колье
    { img: slide07, description: "description04" }, //Броши
    { img: slide05, description: "description04" }, //Одежда
  ];

  return (
    <div className={cls.mainPage}>
      <div className={cls.startImg}>
        {isLg ? (
          <Image img={mainImgDt01} alt={"main"} />
        ) : (
          <img src={mainImg01} alt="main" />
        )}

        <div className={cls.content}>
          <Text size={"m"} position={"center"} padding={"pv2"} ff={"font_test"}>
            <span className={cls.logo}>OLGA YUDINA</span> - женственность,
            воплощенная в украшениях из <br />
            премиальных материалов <br /> с нотками винтажного шика
          </Text>
          <Text size={"s"} position={"center"} padding={"pv2"}>
            Украшения бренда - это размышление мастера на тему изысканности
            повседневного образа. Аксессуары создают настроение сиять, стать
            чувственной героиней любимого романа и привнести в обычный день
            ощущение праздника.
          </Text>
          <Slider images={sliderImages} isDescription={false} />
        </div>
      </div>
    </div>
  );
};

export default MainPage;

/*   <img
            src={mainImgDt01}
            alt="main"
            height={windowInnerHeight}
            className={cls.startImgDesktop}
        /> */
