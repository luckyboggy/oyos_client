// Настройка axios
import axios from "axios";

const url = process.env.REACT_APP_API_URL || 'http://oyos.na4u.ru/';

const $host = axios.create({
  baseURL: url,
});

const $authHost = axios.create({
  baseURL: url,
});

const authInterceptor = config => {
  config.headers.authorization = `Bearer ${window.localStorage.getItem(
    "jsonWebToken"
  )}`;

  return config;
};

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
