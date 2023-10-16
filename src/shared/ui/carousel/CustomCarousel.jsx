import React, { useState } from "react";
import classes from "./CustomCarousel.module.scss";
import { ReactComponent as Prev } from "shared/assets/img/svg//prev.svg";
import { IsMobil } from "../../lib/hooks/IsMobil.js";

const CustomCarousel = ({ images, url }) => {
  const isMobil = IsMobil();
  const [currentImg, setCurrentImg] = useState(0);

  const plusIndex = (n) => {
    if (currentImg + n < 0) {
      setCurrentImg(images.length - 1);
    } else if (currentImg + n > images.length - 1) {
      setCurrentImg(0);
    } else {
      setCurrentImg(currentImg + n);
    }
  };

  return (
    <div className={classes.carousel}>
      <div className={classes.carouselWrapper}>
        <div className={classes.carouselLine}>
          {
            url && <img src={url + images[currentImg]} />
          }
          {
            !url && <img src={images[currentImg]} />
          }
          
          {!isMobil && (
            <div
              className={`${classes.btns} ${classes.prev}`}
              onClick={() => plusIndex(-1)}
            >
              <Prev className={classes.prevArrow} />
            </div>
          )}
          {!isMobil && (
            <div
              className={`${classes.btns} ${classes.next}`}
              onClick={() => plusIndex(1)}
            >
              <Prev className={classes.nextArrow} />
            </div>
          )}
        </div>

        <div className={classes.dots}>
          {images.map((i, index) => (
            <div
              className={`${classes.dotItem} ${
                index === currentImg ? classes.current : ""
              }`}
              key={i}
              onClick={() => setCurrentImg(index)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { CustomCarousel };
