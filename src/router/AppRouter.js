import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CartContext from "../context/CartContext";
import useLocalStorage from "../hooks/useLocalStorage";
import App from "../components/App";
import Products from "../components/Products";
import ShoppingCart from "../components/ShoppingCart";
import MenuItems from "../components/MenuItems";
import Checkout from "../components/Checkout";
import PaymentSuccessPage from "../components/PaymentSuccessPage";

const AppRouter = () => {
  const [items, setItems] = useLocalStorage("cartItems", []);

  return (
    <BrowserRouter>
      <CartContext.Provider value={{ items, setItems }}>
        <Switch>
          <Route exact path="/" component={App} />
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
