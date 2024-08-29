import React, { useState, useContext, useEffect } from "react";
import { useScreenSize } from "shared/lib/hooks/useScreenSize";
import { ProductList } from "widgets/ProductList/ui/ProductList/ProductList.jsx";
import { Filters } from "widgets/Filters/ui/Filters.jsx";
import { ReactComponent as Sort } from "shared/assets/img/svg/sort.svg";
import { ReactComponent as Close } from "shared/assets/img/svg/close.svg";
import { Context } from "index.js";
import { useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { fetchTypes, fetchProducts } from "http/productAPI.js";
import { Pagination } from "shared/ui/pagination/Pagination.jsx";
import { ToLogin } from "widgets/ToLogin/ui/ToLogin";
import { CustomButton } from "shared/ui/button/CustomButton.jsx";
import { Modal } from "shared/ui/modal/Modal";
import { Preloader } from "shared/ui/preloader/Preloader";
import { SORT_TYPES } from "app/utils/consts";
import logo from "shared/assets/img/png/logo.png";
import { Select } from "shared/ui/select2/Select";
import cls from "./Shop.module.scss";

const Shop = observer(() => {
  const [sort, setSort] = useState(false);
  const [selectedTypesList, setSelectedTypesList] = useState([]);
  const { product, user } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  let location = useLocation();

  const setSelectedSort = (value) => {
    product.setSortType(SORT_TYPES.find((type) => type.value === value));
  };

  const toLogin = (state) => {
    user.setToLogin(state);
  };

  useEffect(() => {
    console.log(product.selectedType);
    fetchTypes()
      .then((data) => product.setTypes(data))
      .then(() => {});
    fetchProducts(
      product.selectedType,
      null,
      product.limit,
      1,
      product.sortType.value
    )
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
    setIsLoading(true);
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
  }, [
    product,
    product.page,
    product.selectedType,
    product.sortType.value,
    product.limit,
  ]);

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
      {useScreenSize().isSm ? (
        <div className={cls.toolbar}>
          <div className={cls.filter}>
            <Select
              options={product.types}
              type={"checkbox"}
              selected={"Выберите категории"}
              size={"s"}
            />
          </div>
          <div className={cls.sort}>
            <Select
              options={SORT_TYPES}
              selected={product.sortType.value}
              setSelected={setSelectedSort}
              size={"s"}
            />
          </div>
        </div>
      ) : (
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
      )}

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

      {/* Показать ещё */}
      {product.totalCount > product.limit && (
        <div className={cls.more}>
          <CustomButton
            /* theme={"inverted"} */
            onClick={(e) => {
              e.preventDefault();
              product.setLimit(product.limit + 8);
            }}
          >
            показать ещё
          </CustomButton>
        </div>
      )}

      {/* Пагинация */}
      {/* product.pageCount > 1 && <Pagination /> */}
    </div>
  );
});

export default Shop;
