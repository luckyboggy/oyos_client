import React, { useContext, useState, useEffect } from "react";
import { Context } from "index.js";
import { ReactComponent as Add } from "shared/assets/img/svg/add.svg";
import { ReactComponent as AddImg } from "shared/assets/img/svg/add02.svg";
import { ReactComponent as Accept } from "shared/assets/img/svg/accept.svg";
import { ReactComponent as Close } from "shared/assets/img/svg/close.svg";
import { CustomInput } from "shared/ui/input/CustomInput.jsx";
import { CustomTextArea } from "shared/ui/textarea/CustomTextArea.jsx";
import { CustomSelect } from "shared/ui/select/CustomSelect.jsx";
import { CustomButton } from "shared/ui/button/CustomButton";
import { Text } from "shared/ui/text/Text";
import { observer } from "mobx-react-lite";
import { createProduct } from "http/productAPI.js";
import { ProductList } from "widgets/ProductList/ui/ProductList/ProductList.jsx";
import {
  fetchProducts,
  fetchTypes,
  fetchCollections,
} from "http/productAPI.js";
import cls from "./ProductManagement.module.scss";

const ProductManagement = observer(() => {
  const { product } = useContext(Context);
  const [creation, setCreation] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    img: null,
    materials: "",
    description: "",
    materials: "",
    typeId: null,
    collectionId: null,
    productSize: [{ size: "unified", quantity: 1 }],
  });

  const selectFile = (event) => {
    setNewProduct({ ...newProduct, img: event.target.files });
  };

  const images = newProduct.img ? [...newProduct.img] : [];

  const selectTypeId = (typeName) => {
    const id = product.types.find((type) => {
      return type.name === typeName;
    }).id;
    setNewProduct({ ...newProduct, typeId: id });
  };

  const selectCollectionId = (collectionName) => {
    const id = product.collections.find((collection) => {
      return collection.name === collectionName;
    }).id;
    setNewProduct({ ...newProduct, collectionId: id });
  };

  const addSize = (event) => {
    event.preventDefault();
    setSizes([...sizes, { size: "", quantity: "" }]);
  };

  const addProduct = () => {
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("typeId", newProduct.typeId);
    formData.append("collectionId", newProduct.collectionId);
    formData.append("description", newProduct.description);
    formData.append("materials", newProduct.materials);

    if (sizes.length > 0) {
      formData.append("productSize", JSON.stringify(sizes));
    } else {
      formData.append("productSize", JSON.stringify(newProduct.productSize));
    }

    console.log(images);
    images.forEach((img, i) => {
      formData.append(`img`, img);
    });

    createProduct(formData).then(() => {
      setNewProduct({
        name: "",
        price: "",
        img: null,
        description: "",
        materials: "",
        typeId: null,
        collectionId: null,
        productSize: [{ size: "unified", quantity: 1 }],
      });
      setSizes([]);
    });
  };

  useEffect(() => {
    fetchCollections()
      .then((data) => {
        product.setCollections(data);
      })
      .then(() => {
        fetchTypes().then((data) => {
          product.setTypes(data);
        });
      });
    /* .then(() => {
        fetchProducts(null, null, product.limit, 1).then((data) => {
          product.setItems(data.rows);
        });
      }); */
  }, []);

  return (
    <div className={cls.products}>
      {!creation && (
        <div className={cls.addProduct}>
          <Add
            className={cls.addPeoductItem}
            onClick={() => setCreation(true)}
          />
        </div>
      )}

      {/* Новый товар */}
      {creation && (
        <form className={cls.newProduct}>
          <Text size={"m"} position={"center"}>
            Новый товар
          </Text>
          {/* Name */}
          <div className={cls.input}>
            <Text size={"s"} position={"left"}>
              Название
            </Text>
            <CustomInput
              placeholder="название"
              size={"s"}
              value={newProduct.name}
              onChange={(event) =>
                setNewProduct({ ...newProduct, name: event.target.value })
              }
            />
          </div>
          {/* price */}
          <div className={cls.input}>
            <Text size={"s"} position={"left"}>
              Цена
            </Text>
            <CustomInput
              placeholder="цена"
              size={"s"}
              value={newProduct.price}
              onChange={(event) =>
                setNewProduct({
                  ...newProduct,
                  price: Number(event.target.value),
                })
              }
            />
          </div>
          {/* type */}
          <div className={cls.input}>
            <Text size={"s"} position={"left"}>
              Категория
            </Text>
            <CustomSelect
              defValue={"выбор категории"}
              options={product.types}
              onChange={selectTypeId}
              size={"s"}
            />
          </div>
          <div className={cls.input}>
            <Text size={"s"} position={"left"}>
              Коллекция
            </Text>
            <CustomSelect
              defValue={"выбор коллекции"}
              options={product.collections}
              onChange={selectCollectionId}
              size={"s"}
            />
          </div>
          {/* images */}
          <div className={cls.images}>
            {images.length != 0 &&
              images.map((image) => (
                <img
                  key={image.name}
                  src={URL.createObjectURL(image)}
                  className={cls.imageItem}
                />
              ))}

            <div>
              <input
                type="file"
                multiple
                accept="image/+"
                onChange={selectFile}
                className={cls.fileInput}
                id="fileInput"
              />
              <label htmlFor="fileInput">
                <div className={`${cls.imageItem} ${cls.addNewImages}`}>
                  <AddImg className={cls.addImg} />
                </div>
              </label>
            </div>
          </div>
          {/* description */}
          <CustomTextArea
            placeholder="описание"
            size={"s"}
            value={newProduct.description}
            onChange={(event) =>
              setNewProduct({
                ...newProduct,
                description: event.target.value,
              })
            }
          />
          {/* Материалы */}
          <CustomTextArea
            placeholder="материалы"
            size={"s"}
            value={newProduct.materials}
            onChange={(event) =>
              setNewProduct({
                ...newProduct,
                materials: event.target.value,
              })
            }
          />

          <div className={cls.sizes}>
            <Text size={"s"} position={"left"} padding="pv1">
              Размеры
            </Text>
            {sizes.map((size, index) => (
              <div className={cls.sizeItem} key={index}>
                <CustomInput
                  placeholder="размер"
                  size={"s"}
                  value={size.size}
                  onChange={(event) =>
                    setSizes(
                      sizes.map((item, i) =>
                        i === index
                          ? { ...item, size: event.target.value }
                          : item
                      )
                    )
                  }
                />
                <CustomInput
                  placeholder="количество"
                  size={"s"}
                  value={size.quantity}
                  onChange={(event) =>
                    setSizes(
                      sizes.map((item, i) =>
                        i === index
                          ? { ...item, quantity: event.target.value }
                          : item
                      )
                    )
                  }
                />
              </div>
            ))}
            <div className={cls.addSize}>
              <CustomButton fontSize={"s"} onClick={(event) => addSize(event)}>
                добавить размер
              </CustomButton>
            </div>
          </div>

          <div className={cls.btns}>
            <Accept
              type="submit"
              className={cls.acceptBtn}
              onClick={() => {
                console.log(newProduct);

                addProduct();
              }}
            />
            <Close
              className={cls.closeBtn}
              onClick={() => setCreation(false)}
            />
          </div>
        </form>
      )}

      {/* Фильтр/Сортировка */}
      <div></div>

      {/* Список товаров */}

      {/* <ProductList /> */}
    </div>
  );
});

export { ProductManagement };
