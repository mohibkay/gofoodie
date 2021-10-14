import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "../components/App";
import MenuItems from "../components/MenuItems";
import Products from "../components/Products";
import ShoppingCart from "../components/ShoppingCart";
import useLocalStorage from "../hooks/useLocalStorage";

const AppRouter = () => {
  const [items, setItems] = useLocalStorage("cartItems", []);

  return (
    <BrowserRouter>
      <Switch>
        <Route component={App} path="/" exact={true} />
        <Route component={MenuItems} path="/menu" />
        <Route
          path="/products"
          render={(props) => (
            <Products {...props} items={items} setItems={setItems} />
          )}
        />
        <Route
          path="/cart"
          render={(props) => (
            <ShoppingCart {...props} items={items} setItems={setItems} />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
