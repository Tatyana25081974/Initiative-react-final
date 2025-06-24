// Функція для безпечного отримання змінної середовища з .env
export const getEnvVar = key => {
    const value = import.meta.env[key];
  
    if (!value) {
      throw new Error(`Environment variable ${key} is missing`);
    }
  
    return value;
  };
  