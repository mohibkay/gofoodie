import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children, cartCount }) => {
  return (
    <React.Fragment>
      <Header showCart={true} cartCount={cartCount} />
      <div className="content">{children}</div>
      <Footer className="footer" />
    </React.Fragment>
  );
};

export default Layout;
