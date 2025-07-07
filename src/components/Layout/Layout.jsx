import Footer from "../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";
import Outlet from "../Outlet/Outlet.jsx";

import css from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <div className={css.flexBox}>
      <Header />

      <div className={css.outletBox}>
        <Outlet>{children}</Outlet>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
