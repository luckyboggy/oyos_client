import React, { useState, useContext, useEffect } from "react";
import { Context } from "index.js";
import { Link } from "react-router-dom";
import { BasketList } from "widgets/BasketList/ui/BasketList/ui/BasketList.jsx";
import { basketTotalPrice } from "shared/lib/functions/basketFunctions.js";
import { observer } from "mobx-react-lite";
import { CustomButton } from "shared/ui/button/CustomButton.jsx";
import cls from "./Basket.module.scss";
import { Text } from "shared/ui/text/Text";

const Basket = observer(() => {
  const { user } = useContext(Context);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    basketTotalPrice().then((total) => setTotalPrice(total));
  }, [user.localBasket]);

  return (
    <div className={cls.basket}>
      {(user.isAuth && user.basketCount === 0) ||
      (!user.isAuth && user.localBasket.length === 0) ? (
        <div className={cls.empty}>Ваша корзина пуста</div>
      ) : (
        <div>
          <div className={cls.check}>
            <div className={cls.title}>Корзина</div>
            <div className={cls.products}>
              <BasketList />
              <div className={cls.totalPrice}>СУММА: {totalPrice.toLocaleString()} Р</div>
            </div>

            <div className={cls.confirm}>
             
              <div className={cls.order}>
                <Link to="/ordering">
                  <CustomButton fontSize={"s"}>Оформить заказ</CustomButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export { Basket };
