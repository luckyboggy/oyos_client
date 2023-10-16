import React, { useContext, useState, useEffect } from "react";
import { Context } from "index.js";
import { ReactComponent as Add } from "shared/assets/img/svg/add.svg";
import { ReactComponent as Remove } from "shared/assets/img/svg/delete.svg";
import { ReactComponent as Accept } from "shared/assets/img/svg/accept.svg";
import { ReactComponent as Close } from "shared/assets/img/svg/close.svg";
import { CustomInput } from "shared/ui/input/CustomInput.jsx";
import { Text } from "shared/ui/text/Text";
import {
  fetchCollections,
  deleteCollection,
  createCollection,
} from "http/productAPI.js";
import { observer } from "mobx-react-lite";
import cls from "./CollectionsManagement.module.scss";

const CollectionManagement = observer(() => {
  const { product } = useContext(Context);
  const [creation, setCreation] = useState(false);
  const [newCollection, setNewCollection] = useState("");

  // Добавление коллекции
  const addCollection = () => {
    createCollection({ name: newCollection })
      .then((data) => {
        setNewCollection("");
        setCreation(false);
      })
      .then(() => {
        fetchCollections().then((data1) => {
          product.setCollections(data1);
        });
      });
  };

  // Удаление коллекции
  const removeCollection = (collection) => {
    deleteCollection(collection.id).then(() => {
      fetchCollections().then((data1) => {
        product.setCollections(data1);
      });
    });
  };

  useEffect(() => {
    fetchCollections().then((data) => {
      product.setCollections(data);
    });
  }, []);

  return (
    <div className={cls.collection}>
      <div className={cls.collectionList}>
        {product.collections.map((collection) => (
          <div key={collection.name} className={cls.collectionItem}>
            <Text size={"m"} position={"left"}>
              {collection.name}
            </Text>
            <Remove
              className={cls.removeBtn}
              onClick={() => removeCollection(collection)}
            />
          </div>
        ))}
      </div>

      {!creation && (
        <div className={cls.addCollection}>
          <Add
            className={cls.addCollectionItem}
            onClick={() => setCreation(true)}
          />
        </div>
      )}

      {/* Новая коллекция */}
      {creation && (
        <form className={cls.newCollection}>
          <div className={cls.input}>
            <Text size={"s"} position={"left"}>
              Новая коллекция
            </Text>
            <CustomInput
              placeholder={"категория"}
              size={"s"}
              value={newCollection}
              onChange={(event) => setNewCollection(event.target.value)}
            />
          </div>
          <div className={cls.btns}>
            <Accept
              type="submit"
              className={cls.acceptBtn}
              onClick={() => addCollection()}
            />
            <Close
              className={cls.closeBtn}
              onClick={() => setCreation(false)}
            />
          </div>
        </form>
      )}
    </div>
  );
});

export { CollectionManagement };
