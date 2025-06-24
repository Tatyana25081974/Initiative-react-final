// Якщо є значення — повертаємо "{value} kcal"
// Якщо немає — повертаємо "—"
export const formatCalories = value => {
    return value ? `${value} kcal` : '—';
  };
  