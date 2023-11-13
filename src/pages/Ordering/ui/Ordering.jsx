import React, { useState, useContext } from "react";
import { Context } from "index.js";
import { CustomButton } from "shared/ui/button/CustomButton.jsx";
import { CustomInput } from "shared/ui/input/CustomInput.jsx";
import { change } from "http/userAPI";
import {
  fetchCity,
  fetchStreet,
} from "shared/lib/functions/autocompleteFunctions.js";
import cls from "./Ordering.module.scss";
import { handleFromBasketToOrder } from "shared/lib/functions/orderFunctions";
import { PersonalData } from "widgets/Personal/PersonalData";
import { PersonalAddress } from "widgets/Personal/PersonalAddress/ui/PersonalAddress";

const Ordering = () => {
  const { user } = useContext(Context);
  const [newPersonal, setNewPersonal] = useState({
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

  const changePersonal = () => {
    change(
      user.user.email,
      newPersonal.name,
      newPersonal.surename,
      newPersonal.phone
    ).then((data) => {
      user.setUser(data);
    });
  };

  const [suggestionCity, setSuggestionCity] = useState([]);
  const [suggestionStreet, setSuggestionStreet] = useState([]);

  return (
    <div className={cls.ordering}>
      {user.isAuth ? (
        <div className={cls.personal}>
          <PersonalData
            user={user}
            personal={newPersonal}
            setPersonal={setNewPersonal}
          />
        </div>
      ) : (
        <div className={cls.personal}></div>
      )}

      <div className={cls.delivery}>
        <div className="fs20">Доставка</div>
        <PersonalAddress
          address={customerAddress}
          setAddress={setCustomerAddress}
        />
      </div>

      {/* Вариант с автозаполнением (не окончен) */}
      {/*       <div className={cls.delivery}>
        <div className="fs20">Доставка</div>
        <CustomInput
          type="text"
          placeholder="city"
          list="deliveryCity"
          value={customerAddress.city}
          onChange={(event) => {
            setCustomerAddress({
              ...customerAddress,
              city: event.target.value,
            });
            fetchCity(event.target.value).then((data) =>
              setSuggestionCity(data)
            );
            setCustomerAddress({
              ...customerAddress,
              street: "",
              house: "",
              flat: "",
            });
          }}
        />
        <datalist id="deliveryCity">
          {suggestionCity.map((city) => (
            <option value={city.data.city} key={city.data.city}></option>
          ))}
        </datalist>
        <CustomInput
          type="text"
          placeholder="street"
          list="deliveryStreet"
          value={customerAddress.street}
          onChange={(event) => {
            setCustomerAddress({
              ...customerAddress,
              street: event.target.value,
            });
            fetchStreet(
              event.target.value,
              suggestionCity[0].data.city_fias_id
            ).then((data) => setSuggestionStreet(data));
          }}
        />
        <datalist id="deliveryStreet">
          {suggestionStreet.map((street) => (
            <option
              value={`${street.data.street_type}. ${street.data.street}`}
              key={street.data.street}
            ></option>
          ))}
        </datalist>
        <div className={cls.houseFlat}>
          <CustomInput
            type="text"
            placeholder="house"
            value={customerAddress.house}
            onChange={(event) => {
              setCustomerAddress({
                ...customerAddress,
                house: event.target.value,
              });
            }}
          />
          <CustomInput
            type="text"
            placeholder="flat"
            value={customerAddress.flat}
            onChange={(event) => {
              setCustomerAddress({
                ...customerAddress,
                flat: event.target.value,
              });
            }}
          />
        </div>
      </div> */}

      <CustomButton
        fontSize={"s"}
        onClick={(event) => {
          event.preventDefault();
          // console.log(customerData);
          // console.log(customerAddress);
          // console.log(suggestionCity);
          // console.log(suggestionStreet);
          handleFromBasketToOrder();
        }}
      >
        Оформить
      </CustomButton>
    </div>
  );
};

export { Ordering };
