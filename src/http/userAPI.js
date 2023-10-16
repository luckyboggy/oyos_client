import { $authHost, $host } from "../shared/api/index.js";
import jwt_decode from "jwt-decode";

const registration = async (email, password) => {
  const { data } = await $host.post("api/user/registration", {
    email,
    password,
    role: "USER",
  });
  window.localStorage.setItem("jsonWebToken", data.jsonWebToken);
  return jwt_decode(data.jsonWebToken);
};

const login = async (email, password) => {
  const { data } = await $host.post("api/user/login", { email, password });
  window.localStorage.setItem("jsonWebToken", data.jsonWebToken);
  return jwt_decode(data.jsonWebToken);
};

const check = async () => {
  const { data } = await $authHost.get("api/user/auth");
  window.localStorage.setItem("jsonWebToken", data.jsonWebToken);
  return jwt_decode(data.jsonWebToken);
};

const change = async (email, name, surename, phone) => {
  const data = await $authHost.post("api/user/change", {
    name, surename, email, phone
  });
  return data.data;
}

const fetchUser = async (id) => {
  const { data } = await $authHost.get(`api/user/${id}`);
  return data;
}

export { registration, login, check, change, fetchUser };
