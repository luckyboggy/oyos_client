import React, { useState, useContext, useEffect } from "react";
import { useScreenSize } from "shared/lib/hooks/useScreenSize";
import { Context } from "index.js";
import { Link } from "react-router-dom";
import { PersonalData } from "widgets/Personal/PersonalData";
import { PersonalAddress } from "widgets/Personal/PersonalAddress/ui/PersonalAddress";
import { BasketList } from "widgets/BasketList/ui/BasketList/ui/BasketList.jsx";
import { basketTotalPrice } from "shared/lib/functions/basketFunctions.js";
import { observer } from "mobx-react-lite";
import { CustomButton } from "shared/ui/button/CustomButton.jsx";
import { Text } from "shared/ui/text/Text";
import { handleFromLocalBasketToOrder } from "shared/lib/functions/orderFunctions";
import cls from "./Basket.module.scss";

const Basket = observer(() => {
  const { user } = useContext(Context);
  const [totalPrice, setTotalPrice] = useState(0);

  const isMd = useScreenSize().isMd;

  const [newPersonal, setNewPersonal] = useState({
    email: "",
    name: "",
    surename: "",
    phone: "",
  });

  const [customerAddress, setCustomerAddress] = useState({
    city: "",
    street: "",
    house: "",
    flat: "",
    zipCode: 0,
  });


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
              {!isMd && (
                <div className={cls.totalPrice}>
                  СУММА: {totalPrice.toLocaleString()} ₽
                </div>
              )}
            </div>

            {!isMd && (
              <div className={cls.confirm}>
                <div className={cls.order}>
                  <Link to="/ordering">
                    <CustomButton fontSize={"s"}>Оформить заказ</CustomButton>
                  </Link>
                </div>
              </div>
            )}
            {isMd && (
              <div className={cls.details}>
                <Text padding={"pv1"} size={"m"}>
                  Детали заказа
                </Text>

                <div className={cls.detailsWrapper}>
                  <div className={cls.ordering}>
                    <PersonalData
                      user={user}
                      personal={newPersonal}
                      setPersonal={setNewPersonal}
                    />
                    <Text padding={"pv1"} size={"m"}>
                      Доставка
                    </Text>
                    <PersonalAddress
                      address={customerAddress}
                      setAddress={setCustomerAddress}
                    />
                  </div>
                  <div className={cls.total}>
                    <div className={cls.links}>
                      {!user.isAuth && (
                        <Link
                          to="../login"
                          className={`${cls.link} ${cls.loginLink}`}
                        >
                          Войти в личный кабинет
                        </Link>
                      )}

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
                        handleFromLocalBasketToOrder(newPersonal);
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
