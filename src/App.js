import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import CartContext from "./context/CartContext";
import useLocalStorage from "./hooks/useLocalStorage";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";
import MenuItems from "./components/MenuItems";
import Checkout from "./components/Checkout";
import PaymentSuccessPage from "./components/PaymentSuccessPage";
import Loader from "./components/Loader";
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
          <Route path="/menu" component={MenuItems} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/success" component={PaymentSuccessPage} />
        </Switch>
      </CartContext.Provider>
    </BrowserRouter>
  );
};

export default AppRouter;
