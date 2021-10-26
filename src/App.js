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
import MenuItems from "./pages/MenuItems";
import Checkout from "./pages/Checkout";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";

// Utilities
import { LOADING_MESSAGE } from "./utils/constants";
import * as ROUTES from "./utils/routes";

const AppRouter = () => {
  const [items, setItems] = useLocalStorage("cartItems", []);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <BrowserRouter>
      <Loader show={isLoading}>{LOADING_MESSAGE}</Loader>
      <CartContext.Provider value={{ items, setItems, setIsLoading }}>
        <Switch>
          <Route exact path={ROUTES.HOME} component={Home} />
          <Route path={ROUTES.PRODUCTS} component={Products} />
          <Route path={ROUTES.CART} component={ShoppingCart} />
          <Route path={ROUTES.MENU} component={MenuItems} />
          <Route path={ROUTES.CHECKOUT} component={Checkout} />
          <Route path={ROUTES.SUCCESS} component={PaymentSuccessPage} />
        </Switch>
      </CartContext.Provider>
    </BrowserRouter>
  );
};

export default AppRouter;
