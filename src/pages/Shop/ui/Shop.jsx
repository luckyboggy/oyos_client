import React, { useState, useContext, useEffect } from "react";
import { ProductList } from "widgets/ProductList/ui/ProductList/ProductList.jsx";
import { Filters } from "widgets/Filters/ui/Filters.jsx";
import { ReactComponent as Sort } from "shared/assets/img/svg/sort.svg";
import { ReactComponent as Close } from "shared/assets/img/svg/close.svg";
import { Context } from "index.js";
import { observer } from "mobx-react-lite";
import { fetchTypes, fetchProducts } from "http/productAPI.js";
import { Pagination } from "shared/ui/pagination/Pagination.jsx";
import { ToLogin } from "widgets/ToLogin/ui/ToLogin";
import { CustomButton } from "shared/ui/button/CustomButton.jsx";
import { Modal } from "shared/ui/modal/Modal";
import { Preloader } from "shared/ui/preloader/Preloader";
import cls from "./Shop.module.scss";

import logo from "shared/assets/img/png/logo.png";

const Shop = observer(() => {
  const [sort, setSort] = useState(false);
  const [selectedTypesList, setSelectedTypesList] = useState([]);
  const { product, user } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);

  const toLogin = (state) => {
    user.setToLogin(state);
  };

  useEffect(() => {
    fetchTypes().then((data) => product.setTypes(data));
    fetchProducts(null, null, product.limit, 1, product.sortType.value)
      .then((data) => {
        product.setItems(data.rows);
        product.setTotalCount(data.count);
        product.setPageCount();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchProducts(
      product.selectedType,
      null,
      product.limit,
      product.page,
      product.sortType.value
    )
      .then((data) => {
        product.setItems(data.rows);
        product.setTotalCount(data.count);
        product.setPageCount();
      })
      .then(() => {
        let st = [];
        product.selectedType.forEach((item) => {
          st.push(
            product.types.find((type) => {
              return type.id === item;
            })
          );
        });
        setSelectedTypesList(st);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [product.page, product.selectedType, product.sortType.value]);

  return (
    <div className={cls.shop}>
      {/* Модальное окно с фильтрами */}
      {sort && (
        <Modal type={"lower"} title={"Фильтры"} close={setSort}>
          <Filters closeModal={setSort} />
        </Modal>
      )}
      {/* Модальное окно с напоминанием зарегистрироваться */}
      {user.toLogin && (
        <Modal type={"central"} img={logo} close={toLogin}>
          <ToLogin close={toLogin} />
          <CustomButton
            fontSize={"s"}
            theme={"inverted"}
            margins={"mt1"}
            onClick={() => toLogin(false)}
          >
            Без регистрации
          </CustomButton>
        </Modal>
      )}

      {/* тулбар */}
      <div className={cls.toolbar}>
        <div className={cls.selected}></div>
        <div
          className={cls.filter}
          onClick={() => {
            setSort(!sort);
          }}
        >
          <div className={cls.filterTitle}>
            <div className={cls.filterName}>Фильтры</div>
            <Sort className={cls.filterIcon} />
          </div>
        </div>
      </div>

      {/* Выбранные категории */}
      <div className={cls.selectedTypes}>
        {selectedTypesList.map(
          (item) =>
            item && (
              <div
                className={cls.selectedType}
                key={item.name}
                onClick={() => product.deleteFromSelectedType(item.id)}
              >
                <Close className={cls.delete} />
                <div className={cls.typeName}>{item.name}</div>
              </div>
            )
        )}
      </div>

      {/* Список товаров */}

        {isLoading ? <Preloader /> : <ProductList />}


      {/* Пагинация */}
      {product.pageCount > 1 && <Pagination />}
    </div>
  );
});

export { Shop };
