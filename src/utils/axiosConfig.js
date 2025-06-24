import axios from 'axios';
import { getEnvVar } from './getEnvVar';

// Створюємо екземпляр axios із базовим URL з .env
const instance = axios.create({
  baseURL: getEnvVar('VITE_API_URL'),
  withCredentials: true, //axios автоматично надсилатиме і отримуватиме cookies (наприклад, для refresh-токена або сесій, якщо бекенд їх використовує).
});

// Функція для додавання токена авторизації в заголовок
export const setAuthHeader = token => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Функція для очищення токена
export const clearAuthHeader = () => {
  delete instance.defaults.headers.common.Authorization;
};

export default instance;
