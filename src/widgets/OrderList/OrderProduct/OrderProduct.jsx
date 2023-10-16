import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PRODUCT_ROUTE } from "app/utils/consts.js";
import { fetchOneProduct } from "http/productAPI.js";
import cls from "./OrderProduct.module.scss";

const OrderProduct = ({ orderProduct }) => {
  const [product, setProduct] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchOneProduct(orderProduct.productId).then((data) => setProduct(data));
  }, []);

  console.log(orderProduct)

  return (
    <div className={cls.orderProduct}>
      <div className={cls.content}>
        <div
          className={cls.orderProductImg}
          onClick={() => {
            navigate("../" + PRODUCT_ROUTE + "/" + orderProduct.productId);
          }}
        >
          {product.img && (
            <img
              src={process.env.REACT_APP_API_URL + product.img[0]}
              key={product.img[0]}
            />
          )}
        </div>
        <div className={cls.info}>
          <div className={cls.title}>
            <div className={cls.name}>{product.name}</div>
          </div>
          <div className={cls.price}>
            {orderProduct.price && orderProduct.price.toLocaleString()} р
          </div>
          {orderProduct.selectedSize !== "unified" && (
            <div className={cls.size}>Размер: {orderProduct.selectedSize}</div>
          )}
        </div>
      </div>
      
    </div>
  );
};

export { OrderProduct };
