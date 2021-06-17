import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "../components/App";
import MenuItems from "../components/MenuItems";
import Products from "../components/Products";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={App} path="/" exact={true} />
        <Route component={MenuItems} path="/menu" />
        <Route component={Products} path="/products" />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
