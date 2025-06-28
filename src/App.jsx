import { BrowserRouter } from "react-router-dom";
// import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import Logo from "./components/Logo/Logo.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Logo />
      {/* <AppRoutes /> */}
      <Toaster position="top-right" />
    </BrowserRouter>
  );
};

export default App;
