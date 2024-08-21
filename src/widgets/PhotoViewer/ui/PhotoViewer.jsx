import React, { useState, useRef, useEffect } from "react";
import { ReactComponent as Close } from "shared/assets/img/svg/close.svg";
import { ReactComponent as Prev } from "shared/assets/img/svg/prev.svg";
import cls from "./PhotoVIewer.module.scss";

const PhotoViewer = ({ images, url, startIndex, close }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  const [viewerHeight, setVieverHeight] = useState(0);
  const vieverHeightRef = useRef(null);

  const [tabDiap, setTabDiap] = useState({ first: 0, last: 3 });

  const plusIndex = (n) => {
    if (currentIndex + n < 0) {
      setCurrentIndex(images.length - 1);
    } else if (currentIndex + n > images.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + n);
    }
  };

  useEffect(() => {
    setVieverHeight(vieverHeightRef.current.clientHeight);
  }, []);

  useEffect(() => {
    const numerPictures = Math.round(viewerHeight / 150);

    if (viewerHeight && currentIndex > tabDiap.last) {
      setTabDiap((prev) => ({
        first: prev.first + 1,
        last: prev.last + 1,
      }));
    }

    if (viewerHeight && currentIndex < tabDiap.first) {
      setTabDiap((prev) => ({
        first: prev.first - 1,
        last: prev.last - 1,
      }));
    }

    console.log(currentIndex, tabDiap.last);
  }, [currentIndex]);

  return (
    <div className={cls.photoViewer}>
      <div className={cls.wrapper} ref={vieverHeightRef}>
        <div
          className={cls.tabList}
          style={{
            marginTop: `-${tabDiap.first * 150}px`,
            height: `calc(100vh + ${tabDiap.first * 150}px)`,
          }}
        >
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
          {
            /* currentIndex > 0 */ true && (
              <div
                className={`${cls.btn} ${cls.prevBtn}`}
                onClick={() => {
                  plusIndex(-1);
                }}
              >
                <Prev className={cls.prev} />
              </div>
            )
          }
          {
            /* currentIndex < images.length - 1 */ true && (
              <div
                className={`${cls.btn} ${cls.nextBtn}`}
                onClick={() => {
                  plusIndex(1);
                }}
              >
                <Prev className={cls.next} />
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export { PhotoViewer };
