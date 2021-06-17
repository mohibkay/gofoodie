import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "../components/App";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={App} path="/" exact={true} />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
