import React from "react";
import { ToastContainer } from "react-toastify";

// components
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children, cartCount }) => {
  return (
    <React.Fragment>
      <Header showCart={true} cartCount={cartCount} />
      <div className="content">{children}</div>
      <ToastContainer autoClose={2000} hideProgressBar />
      <Footer className="footer" />
    </React.Fragment>
  );
};

export default Layout;
