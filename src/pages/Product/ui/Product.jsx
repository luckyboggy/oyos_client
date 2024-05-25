import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useScreenSize } from "shared/lib/hooks/useScreenSize";
import { fetchOneProduct } from "http/productAPI";
import { CustomCarousel } from "shared/ui/carousel2/CustomCaroousel.jsx";
import { Text } from "shared/ui/text/Text";
import {
  handleAddToBasket,
  isInBasket,
} from "shared/lib/functions/basketFunctions.js";
import {
  isInFavorites,
  toggleFavorite,
} from "shared/lib/functions/favoritesFunctions.js";
import { ReactComponent as Like } from "shared/assets/img/svg/like.svg";

import { observer } from "mobx-react-lite";
import { BASKET_ROUTE } from "app/utils/consts";
import { CustomButton } from "shared/ui/button/CustomButton";
import cls from "./Product.module.scss";

const Product = observer(() => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState({});
  const [selectedSize, setSelectedSize] = useState("unified");
  const [btnsShow, setBtnsShow] = useState(false);
  const [isOneSize, setIsOneSize] = useState(true);

  const favorite = isInFavorites(item.id);
  const isDesktop = useScreenSize().isMd;

  const toggleSize = (newSize) => {
    if (newSize.size === selectedSize) {
      setSelectedSize("unified");
    } else {
      if (newSize.quantity > 0) {
        setSelectedSize(newSize.size);
      }
    }
  };

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 10) {
      setBtnsShow(true);
    } else {
      setBtnsShow(false);
    }
  });

  useEffect(() => {
    fetchOneProduct(id).then((data) => {
      setItem(data);
    });
  }, [id]);

  useEffect(() => {
    if (item.productSize && item.productSize[0].size === "unified") {
      setIsOneSize(true);
    } else {
      setIsOneSize(false);
    }
  }, [item]);

  const sizeChosen =
    item.productSize &&
    item.productSize.length > 1 &&
    selectedSize === "unified";

  return (
    <div className={cls.product}>
      {/* изображения */}
      <div className={cls.productImg}>
        {item.img && (
          <CustomCarousel
            url={process.env.REACT_APP_API_URL}
            images={item.img}
          />
        )}
      </div>

      {/* описание */}
      <div className={cls.content}>
        <div className={cls.titleWrapper}>
          <div className={cls.title}>{item.name}</div>
          {!isDesktop && (
            <div
              className={cls.like}
              onClick={(event) => {
                toggleFavorite(event, item.id, favorite);
              }}
            >
              <Like
                className={`${cls.prodictLike} ${favorite ? cls.liked : ""}`}
              />
            </div>
          )}
        </div>
        <div className={cls.price}>
          {item.price && item.price.toLocaleString()} р
        </div>
        <div className={cls.description}>{item.description}</div>
        <div className={cls.materials}></div>

        {/* Размеры */}
        {item.productSize && !(item.productSize[0].size === "unified") && (
          <div className={cls.sizes}>
            <Text size={"s"} position={"left"}>
              Размеры
            </Text>
            <div className={cls.selectSize}>
              {item.productSize
                .sort((a, b) => a.size - b.size)
                .map((size) => (
                  <div
                    key={size.size}
                    className={`${cls.sizeItem} ${
                      size.size === selectedSize ? cls.selectesSize : ""
                    } ${size.quantity > 0 ? "" : cls.notAvailable}`}
                    onClick={() => toggleSize(size)}
                  >
                    {size.size}
                  </div>
                ))}
            </div>
          </div>
        )}
        {isDesktop && (
          <div className={cls.btns}>
            {isOneSize ? (
              <CustomButton
                fontSize={"s"}
                theme={isInBasket(item.id, selectedSize) ? "inverted" : ""}
                onClick={() => {
                  isInBasket(item.id, selectedSize)
                    ? navigate("../" + BASKET_ROUTE)
                    : handleAddToBasket(item.id, selectedSize);
                }}
              >
                {isInBasket(item.id, selectedSize)
                  ? "оформить"
                  : "добавить в корзину"}
              </CustomButton>
            ) : (
              <CustomButton
                fontSize={"s"}
                theme={
                  sizeChosen || isInBasket(item.id, selectedSize)
                    ? "inverted"
                    : ""
                }
                onClick={() => {
                  if (!sizeChosen) {
                    isInBasket(item.id, selectedSize)
                      ? navigate("../" + BASKET_ROUTE)
                      : handleAddToBasket(item.id, selectedSize);
                  }
                }}
              >
                {sizeChosen
                  ? "выберите размер"
                  : isInBasket(item.id, selectedSize)
                  ? "оформить"
                  : "добавить в корзину"}
              </CustomButton>
            )}
            <div
              className={cls.like}
              onClick={(event) => {
                toggleFavorite(event, item.id, favorite);
              }}
            >
              <Like
                className={`${cls.prodictLike} ${favorite ? cls.liked : ""}`}
              />
            </div>
          </div>
        )}
      </div>

      {/* кнопки */}
      {!isDesktop && (
        <div className={`${cls.btns} ${btnsShow ? "" : cls.hide}`}>
          {isOneSize ? (
            <CustomButton
              fontSize={"s"}
              theme={isInBasket(item.id, selectedSize) ? "inverted" : ""}
              onClick={() => {
                isInBasket(item.id, selectedSize)
                  ? navigate("../" + BASKET_ROUTE)
                  : handleAddToBasket(item.id, selectedSize);
              }}
            >
              {isInBasket(item.id, selectedSize)
                ? "оформить"
                : "добавить в корзину"}
            </CustomButton>
          ) : (
            <CustomButton
              fontSize={"s"}
              theme={
                sizeChosen || isInBasket(item.id, selectedSize)
                  ? "inverted"
                  : ""
              }
              onClick={() => {
                if (!sizeChosen) {
                  isInBasket(item.id, selectedSize)
                    ? navigate("../" + BASKET_ROUTE)
                    : handleAddToBasket(item.id, selectedSize);
                }
              }}
            >
              {sizeChosen
                ? "выберите размер"
                : isInBasket(item.id, selectedSize)
                ? "оформить"
                : "добавить в корзину"}
            </CustomButton>
          )}
        </div>
      )}
    </div>
  );
});

export default Product;
