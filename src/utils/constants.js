// Кількість рецептів на одну сторінку (пагінація)
export const RECIPES_PER_PAGE = 12;

// Значення за замовчуванням для фільтрів
export const DEFAULT_CATEGORY = 'All';
export const DEFAULT_INGREDIENT = 'All';

// Базовий URL API (береться з .env)
export const API_URL = import.meta.env.VITE_API_URL;

// Позиції для Toaster (пуш-повідомлення)
export const TOAST_POSITION = 'top-right';

// Максимальна довжина короткого опису для картки рецепту
export const MAX_DESCRIPTION_LENGTH = 120;

// Категорії вкладок у профілі
export const PROFILE_TABS = {
  OWN: 'own',
  FAVORITES: 'favorites',
};

// Статуси запитів (опціонально для більшої чистоти в thunks)
export const REQUEST_STATUS = {
    IDLE: 'idle',         // початковий стан
    LOADING: 'loading',   // запит триває
    SUCCESS: 'success',   // успішно виконано
    ERROR: 'error',       // сталася помилка
};
