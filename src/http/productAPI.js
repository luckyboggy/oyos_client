import { $authHost, $host } from "../shared/api/index.js";
//import jwt_decode from "jwt-decode"

//Категории
const createType = async (type) => {
  const { data } = await $authHost.post("api/type", type);
  return data;
};

const fetchTypes = async () => {
  const { data } = await $host.get("api/type");
  return data;
};

const deleteType = async (id) => {
  const { data } = await $authHost.delete(`api/type/${id}`);
  //return data;
  window.localStorage.setItem("jsonWebToken", data.jsonWebToken);
  return data.jsonWebToken;
};

//Коллекции
const createCollection = async (collection) => {
  const { data } = await $authHost.post("api/collection", collection);
  return data;
};

const fetchCollections = async () => {
  const { data } = await $host.get("api/collection");
  return data;

};

const deleteCollection = async (id) => {
  const { data } = await $authHost.delete(`api/collection/${id}`);
  //return data;
  window.localStorage.setItem("jsonWebToken", data.jsonWebToken);
  return data.jsonWebToken;
};

//Товары
const createProduct = async (product) => {
  const { data } = await $authHost.post("api/product", product);
  return data;
};

const updateProduct = async (updProduct, id) => {
  const { data } = await $authHost.post(`api/product/${id}`, updProduct);
  return data;
}

const fetchProducts = async (typeIds, collectionId, limit, page, sortType) => {
  const { data } = await $host.get("api/product", {
    params: {
      typeIds,
      collectionId,
      limit,
      page,
      sortType
    },
  });
  return data;
};

const fetchOneProduct = async (id) => {
  const { data } = await $host.get(`api/product/${id}`);
  return data;
};

export {
  createType,
  fetchTypes,
  deleteType,
  createCollection,
  fetchCollections,
  deleteCollection,
  createProduct,
  updateProduct,
  fetchProducts,
  fetchOneProduct,
};
