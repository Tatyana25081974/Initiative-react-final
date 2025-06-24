import { toast } from 'react-hot-toast';

// Універсальна функція обробки помилок
export const errorHandler = error => {
  // Отримуємо повідомлення з відповіді сервера або з самого error
  const message =
    error?.response?.data?.message || // якщо помилка прийшла з бекенду
    error.message ||                   // якщо інша помилка (наприклад, мережа)
    'Щось пішло не так...';            // дефолтне повідомлення

  // Показуємо toast-повідомлення
  toast.error(message);
};
