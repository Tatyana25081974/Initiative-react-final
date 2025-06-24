// Перетворює хвилини в формат:
// - якщо більше 60 хвилин → "1год 30хв"
// - якщо менше 60 хвилин → "45хв"

export const formatTime = minutes => {
    const hrs = Math.floor(minutes / 60);     // скільки повних годин
    const mins = minutes % 60;                // скільки залишилось хвилин
  
    return hrs > 0 ? `${hrs}год ${mins}хв` : `${mins}хв`;
  };
  