import React, { useState } from "react";
import { ReactComponent as Prev } from "shared/assets/img/svg/prev.svg";
import { useScreenSize } from "shared/lib/hooks/useScreenSize";
import { Modal } from "shared/ui/modal/Modal";
import { PhotoViewer } from "widgets/PhotoViewer";
import classes from "./CustomCarousel.module.scss";

const CustomCarousel = ({ images, url }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchPosition, setTouchPosition] = useState(null);
  const [fullScreenPhoto, setFullScreenPhoto] = useState(false);
  const isDesktop = useScreenSize().isMd;

  const plusIndex = (n) => {
    if (currentIndex + n < 0) {
      setCurrentIndex(images.length - 1);
    } else if (currentIndex + n > images.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + n);
    }
  };

  // Swipe

  const handleTouchStart = (event) => {
    const touchDown = event.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const handleTouchMove = (event) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentTouch = event.touches[0].clientX;
    const difference = touchDown - currentTouch;

    if (difference > 5 && currentIndex < images.length - 1) {
      plusIndex(1);
    }

    if (difference < -5 && currentIndex > 0) {
      plusIndex(-1);
    }

    setTouchPosition(null);
  };

  const openFullScreen = (event) => {
    if (
      event.target.className.includes("prev") ||
      event.target.className.includes("next") ||
      event.target.className.includes("dotItem")
    ) {
      return;
    }
    if (isDesktop) {
      setFullScreenPhoto(true);
    }
  };

  return (
    <div className={classes.carousel}>
      {fullScreenPhoto && (
        <Modal type={"full"} close={setFullScreenPhoto}>
          <PhotoViewer images={images} url={url} startIndex={currentIndex} close={setFullScreenPhoto}/>
        </Modal>
      )}
      <div
        className={classes.wrapper}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div
          className={classes.content}
          onClick={(event) => openFullScreen(event)}
        >
          <div
            className={classes.imagesLine}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image) => (
              <img
                src={`${url}${image}`}
                key={image}
                className={classes.imageItem}
                loading="lazy"
              />
            ))}
          </div>
        </div>
        {currentIndex > 0 && isDesktop && (
          <div className={classes.prev} onClick={() => plusIndex(-1)}>
            <Prev className={classes.prevArrow} />
          </div>
        )}
        {currentIndex < images.length - 1 && isDesktop && (
          <div className={classes.next} onClick={() => plusIndex(1)}>
            <Prev className={classes.nextArrow} />
          </div>
        )}

        <div className={classes.dots}>
          {images.map((i, index) => (
            <div
              className={`${classes.dotItem} ${
                index === currentIndex ? classes.current : ""
              }`}
              key={i}
              onClick={() => setCurrentIndex(index)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { CustomCarousel };
