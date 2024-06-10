import React, { useState } from "react";
import { ReactComponent as Close } from "shared/assets/img/svg/close.svg";
import { ReactComponent as Prev } from "shared/assets/img/svg/prev.svg";
import cls from "./PhotoVIewer.module.scss";

const PhotoViewer = ({ images, url, startIndex, close }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  const plusIndex = (n) => {
    if (currentIndex + n < 0) {
      setCurrentIndex(images.length - 1);
    } else if (currentIndex + n > images.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + n);
    }
  };

  return (
    <div className={cls.photoViewer}>
      <div className={cls.wrapper}>
        <div className={cls.tabList}>
          {images.map((image, index) => (
            <img
              src={`${process.env.REACT_APP_API_URL}${image}`}
              key={image}
              className={`${cls.tabItem} ${
                index === currentIndex ? cls.selected : ""
              }`}
              onClick={() => {
                setCurrentIndex(index);
              }}
            />
          ))}
        </div>
        <div className={cls.content}>
          <div className={cls.img}>
            <img
              src={`${process.env.REACT_APP_API_URL}${images[currentIndex]}`}
              key={images[currentIndex]}
              className={cls.imageItem}
            />
          </div>
          <div
            className={`${cls.btn} ${cls.closeBtn}`}
            onClick={() => close(false)}
          >
            <Close className={cls.close} />
          </div>
          {/* currentIndex > 0 */ true && (
            <div
              className={`${cls.btn} ${cls.prevBtn}`}
              onClick={() => {
                plusIndex(-1);
              }}
            >
              <Prev className={cls.prev} />
            </div>
          )}
          {/* currentIndex < images.length - 1 */ true && (
            <div
              className={`${cls.btn} ${cls.nextBtn}`}
              onClick={() => {
                plusIndex(1);
              }}
            >
              <Prev className={cls.next} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { PhotoViewer };
