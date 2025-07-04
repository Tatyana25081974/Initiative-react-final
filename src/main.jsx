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
import { store, persistor } from "./redux/store";

import { BrowserRouter } from "react-router-dom";
import App from "./App/App.jsx";

import "modern-normalize/modern-normalize.css";
import "./index.css";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
  // </StrictMode>
);
