import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "index.js";
import { fetchTypes } from "http/productAPI.js";
import cls from "./Slider.module.scss";
import { PhotoLoader } from "shared/ui/photoLoader/PhotoLoader";

const Slider = ({ images, isDescription }) => {
  const { product } = useContext(Context);

  useEffect(() => {
    fetchTypes().then((data) => product.setTypes(data));
  }, []);

  const slides = product.types.map((type, index) => {
    return { type: type, ...images[index] };
  });

  return (
    <div className={cls.slider}>
      <div className={cls.wrapper}>
        <div className={cls.list}>
          {slides.map((slide) => (
            <Link
              key={slide.type.name}
              className={cls.item}
              to="shop"
              onClick={() => {
                product.setSelectedType(slide.type);
              }}
            >
              {slide.img ? (
                <img
                  src={slide.img}
                  alt={slide.type.name.name}
                  className={cls.image}
                />
              ) : (
                <PhotoLoader />
              )}

              <div className={cls.content}>
                <div className={cls.title}>{slide.type.name}</div>
                {isDescription && (
                  <div className={cls.description}>{slide.description}</div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export { Slider };
