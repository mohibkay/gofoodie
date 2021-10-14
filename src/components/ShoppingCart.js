/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
import { TiDelete } from "react-icons/ti";
import { removeFromCartAction } from "../actions/cartActions";
import { getFormattedPrice, getFormattedToppings } from "../utils/functions";
import Layout from "./Layout";
import { getAllProducts } from "../actions/productsActions";
import { CURRENCY, REMOVE_FROM_CART_SUCCESS } from "../utils/constants";
import CartContext from "../context/CartContext";

const ShoppingCart = ({ cart, products, dispatch, history, isFailed }) => {
  const [cartProducts, setCartProducts] = useState(() => cart);
  const [errorMsg, setErrorMsg] = useState("");

  const { items, setItems } = useContext(CartContext);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  useEffect(() => {
    if (isFailed) {
      setErrorMsg("Something went wrong. Try again later.");
    } else {
      setErrorMsg("");
    }
  }, [isFailed]);

  useEffect(() => {
    if (cart.length === 0 || items.length !== cart.length) {
      if (items.length > cart.length) {
        setCartProducts(items);
      } else {
        setCartProducts(cart);
      }
    }
  }, []);

  const removeItemFromCart = (id) => {
    const action = dispatch(removeFromCartAction(id));
    if (action?.type === REMOVE_FROM_CART_SUCCESS) {
      const filteredProducts = cartProducts.filter((item) => item.id !== id);
      setItems(filteredProducts);
      setCartProducts(filteredProducts);
    }
  };

  const doCheckout = (event) => {
    event.preventDefault();
    const oosItems = [];
    cart.forEach((cartItem) => {
      const item = products.find((product) => product.id === cartItem.id);
      if (item.quantity === 0) {
        oosItems.push(item.name);
      }
    });
    if (oosItems.length === 0) {
      setErrorMsg("");
      history.push("/checkout");
    } else {
      setErrorMsg(
        `${oosItems.join(", ")} ${
          oosItems.length > 1 ? "are" : "is"
        } out of stock. Please remove to proceed.`
      );
    }
  };

  return (
    <Layout cartCount={items.length}>
      <div className="main-title">Shopping Cart</div>
      {cartProducts.length > 0 ? (
        <>
          {errorMsg !== "" && <p className="oosMsg">{errorMsg}</p>}
          <div className="shopping-cart">
            <ul className="cart-items">
              {cartProducts.map(
                (
                  {
                    id,
                    title,
                    quantity,
                    image,
                    price,
                    toppings = [],
                    category,
                  },
                  index
                ) => {
                  let formattedToppings = [];
                  const isPizzaCategory = category === "pizza";
                  if (isPizzaCategory) {
                    formattedToppings = getFormattedToppings(toppings);
                  }
                  return (
                    <li key={index} className="cart-item">
                      <div>
                        <img src={image} alt={title} className="cart-img" />
                      </div>
                      <div className="p-top flex-grow-1 product-info">
                        <h6>{title}</h6>
                        {isPizzaCategory ? (
                          formattedToppings.length > 0 ? (
                            <p>
                              <span style={{ fontWeight: "500" }}>
                                Toppings:
                              </span>{" "}
                              <span className="selected-toppings">
                                {formattedToppings.join(", ")}
                              </span>
                            </p>
                          ) : (
                            <p>
                              <span style={{ fontWeight: "500" }}>
                                Toppings:
                              </span>{" "}
                              Not selected
                            </p>
                          )
                        ) : null}
                      </div>
                      <div className="p-top qty">Qty: {quantity}</div>
                      <div className="p-top price">
                        {CURRENCY} {price.toFixed(2)}
                      </div>
                      <div className="p-top">
                        <TiDelete
                          color="#000"
                          size="25"
                          className="delete-item"
                          onClick={() => removeItemFromCart(id)}
                        />
                      </div>
                    </li>
                  );
                }
              )}
            </ul>
            <div className="cart-summary">
              <div className="summary-header">
                <h6>Order Summary</h6>
              </div>
              <div>
                <div>Number of items</div> <div>{cartProducts.length}</div>
              </div>
              <div className="summary-total">
                <div>Total amount</div>
                <div>
                  {getFormattedPrice(
                    cartProducts.reduce((sum, item) => {
                      return sum + item.price * item.quantity;
                    }, 0)
                  )}
                </div>
              </div>
              <div>
                <a
                  href="/#"
                  onClick={doCheckout}
                  className="action-btn checkout-btn"
                >
                  Checkout
                </a>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="shopping-cart">
          <p className="no-items">Your shopping cart is currently empty.</p>
        </div>
      )}
    </Layout>
  );
};

const mapStateToProps = (state) => {
  const { products, cart } = state;

  return {
    products: products.data,
    cart: cart.data,
    isFailed: cart.isFailed,
  };
};

export default connect(mapStateToProps)(ShoppingCart);
