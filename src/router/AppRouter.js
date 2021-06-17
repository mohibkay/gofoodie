import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "../components/App";
import MenuItems from "../components/MenuItems";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={App} path="/" exact={true} />
        <Route component={MenuItems} path="/menu" />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
