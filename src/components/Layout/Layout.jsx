// import { Suspense } from "react";

import Footer from "../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";
import Outlet from "../Outlet/Outlet.jsx";

// import { PageLoader } from "../../components/Loaders/Loaders";

const Layout = ({ children }) => {
  return (
    <>
      <Header />

      {/* <Suspense fallback={<PageLoader />}>{children}</Suspense> */}

      <Outlet>{children}</Outlet>

      <Footer />
    </>
  );
};

export default Layout;
