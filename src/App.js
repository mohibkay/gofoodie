import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Components
import CartContext from "./context/CartContext";
import useLocalStorage from "./hooks/useLocalStorage";
import Loader from "./components/Loader";

// Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import ShoppingCart from "./pages/ShoppingCart";
// import MenuItems from "./pages/MenuItems";
import Checkout from "./pages/Checkout";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";

// Utilities
import { LOADING_MESSAGE } from "./utils/constants";

const AppRouter = () => {
  const [items, setItems] = useLocalStorage("cartItems", []);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <BrowserRouter>
      <Loader show={isLoading}>{LOADING_MESSAGE}</Loader>
      <CartContext.Provider value={{ items, setItems, setIsLoading }}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/products" component={Products} />
          <Route path="/cart" component={ShoppingCart} />
          {/* <Route path="/menu" component={MenuItems} /> */}
          <Route path="/checkout" component={Checkout} />
          <Route path="/success" component={PaymentSuccessPage} />
        </Switch>
      </CartContext.Provider>
    </BrowserRouter>
  );
};

export default AppRouter;
