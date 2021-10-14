import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CartContext from "../context/CartContext";
import useLocalStorage from "../hooks/useLocalStorage";
import App from "../components/App";
import Products from "../components/Products";
import ShoppingCart from "../components/ShoppingCart";
import MenuItems from "../components/MenuItems";

const AppRouter = () => {
  const [items, setItems] = useLocalStorage("cartItems", []);

  return (
    <BrowserRouter>
      <CartContext.Provider value={{ items, setItems }}>
        <Switch>
          <Route component={App} path="/" exact={true} />
          <Route component={Products} path="/products" />
          <Route component={ShoppingCart} path="/cart" />
          <Route component={MenuItems} path="/menu" />
        </Switch>
      </CartContext.Provider>
    </BrowserRouter>
  );
};

export default AppRouter;
