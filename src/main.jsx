// Імпортуємо React StrictMode для виявлення помилок у розробці
import { StrictMode } from "react";

// Імпорт функції createRoot — новий API для рендерингу в React 18+
import { createRoot } from "react-dom/client";

// Імпорт провайдера Redux — обгортає додаток і передає store у всі компоненти
import { Provider } from "react-redux";

// Імпорт PersistGate — компонент для затримки рендеру,
// поки Redux Persist відновлює стан із localStorage
import { PersistGate } from "redux-persist/integration/react";

// Імпортуємо store (глобальний стан Redux) і persistor (redux-persist)
// import { store, persistor } from './redux/store';

// Підключаємо normalize для вирівнювання стилів між браузерами
import "modern-normalize/modern-normalize.css";

// Підключаємо власні глобальні стилі
import "./App.css";

// Головний компонент додатку
import App from "./App.jsx";

// Підключаємо React до HTML через елемент <div id="root"></div> в index.html
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {" "}
    {/* Перевірка на помилки, попередження у консолі */}
    {/* <Provider store={store}> */}{" "}
    {/* Передаємо Redux store у весь додаток */}
    {/* <PersistGate loading={null} persistor={persistor}> */}
    {/* Поки persist відновлює state з localStorage — можна показати Loader */}
    <App /> {/* Головний компонент додатку */}
    {/* </PersistGate> */}
    {/* </Provider> */}
  </StrictMode>
);
