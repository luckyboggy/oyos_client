import React, { useState, useContext, useEffect } from "react";
import { useScreenSize } from "shared/lib/hooks/useScreenSize";
import { Context } from "index.js";
import { Link } from "react-router-dom";
import { Ordering } from "pages/Ordering/ui/Ordering";
import { BasketList } from "widgets/BasketList/ui/BasketList/ui/BasketList.jsx";
import { basketTotalPrice } from "shared/lib/functions/basketFunctions.js";
import { observer } from "mobx-react-lite";
import { CustomButton } from "shared/ui/button/CustomButton.jsx";
import { Text } from "shared/ui/text/Text";
import { handleFromBasketToOrder } from "shared/lib/functions/orderFunctions";
import cls from "./Basket.module.scss";

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
              {!useScreenSize().isMd && (
                <div className={cls.totalPrice}>
                  СУММА: {totalPrice.toLocaleString()} ₽
                </div>
              )}
            </div>

            {!useScreenSize().isMd && (
              <div className={cls.confirm}>
                <div className={cls.order}>
                  <Link to="/ordering">
                    <CustomButton fontSize={"s"}>Оформить заказ</CustomButton>
                  </Link>
                </div>
              </div>
            )}
            {useScreenSize().isMd && (
              <div className={cls.details}>
                Детали заказа
                <div className={cls.detailsWrapper}>
                  <div className={cls.ordering}>ordering</div>
                  <div className={cls.total}>
                    <div className={cls.links}>
                      <Link to="delivery" className={cls.link}>
                        Доставка и оплата
                      </Link>
                      <Link to="#" className={cls.link}>
                        Гарантия и возврат
                      </Link>
                    </div>
                    <div className={cls.totalPrice}>
                      <div>СУММА:</div>
                      <div>{totalPrice.toLocaleString()} ₽</div>
                    </div>
                    <CustomButton
                      fontSize={"s"}
                      onClick={(event) => {
                        event.preventDefault();
                        handleFromBasketToOrder();
                      }}
                    >
                      Оформить
                    </CustomButton>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

export { Basket };
