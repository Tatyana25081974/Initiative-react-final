import { BrowserRouter } from "react-router-dom";
// import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import Logo from "./components/Logo/Logo.jsx";
import LearnMoreBtn from "./components/LearnMoreBtn/LearnMoreBtn.jsx";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Logo />
      <LearnMoreBtn />
      <LoadMoreBtn onClick={() => console.log("Load more clicked")} />
      {/* <AppRoutes /> */}
      <Toaster position="top-right" />
    </BrowserRouter>
  );
};

export default App;
