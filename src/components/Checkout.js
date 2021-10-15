/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import csc from "country-state-city";
import Layout from "./Layout";
import { getCartTotal, getFormattedToppings } from "../utils/functions";
import { CURRENCY, NODE_API_URL } from "../utils/constants";
import CartContext from "../context/CartContext";
import { loadStripe } from "@stripe/stripe-js/pure";
import axios from "axios";

const Checkout = ({ cart }) => {
  const { items, setIsLoading } = useContext(CartContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry] = useState("IN");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const getStates = async () => {
      try {
        const result = await csc.getStatesOfCountry(selectedCountry);
        let allStates = [];
        allStates = result?.map(({ isoCode, name }) => ({
          isoCode,
          name,
        }));
        const [{ isoCode: firstState = "" } = {}] = allStates;
        setCities([]);
        setSelectedCity("");
        setStates(allStates);
        setSelectedState(firstState);
      } catch (error) {
        setStates([]);
        setCities([]);
        setSelectedCity("");
      }
    };

    if (states.length === 0) {
      getStates();
    }
  }, [selectedCountry]);

  useEffect(() => {
    const getCities = async () => {
      try {
        const result = await csc.getCitiesOfState(
          selectedCountry,
          selectedState
        );
        let allCities = [];
        allCities = result?.map(({ name }) => ({
          name,
        }));
        const [{ name: firstCity = "" } = {}] = allCities;
        setCities(allCities);
        setSelectedCity(firstCity);
      } catch (error) {
        setCities([]);
      }
    };

    if (states.length > 0) {
      getCities();
    }
  }, [selectedState]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const stripe = await loadStripe(
        process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
      );

      const totalOrderAmount = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
      }, 0);

      const response = await axios.post(`${NODE_API_URL}/payment`, {
        cart,
        user: {
          ...data,
          city: selectedCity,
          state: selectedState,
        },
        totalOrderAmount,
      });

      await stripe.redirectToCheckout({
        sessionId: response.data.id,
      });
    } catch (error) {
      console.log("err", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout cartCount={items.length}>
      <div className="main-title">Shipping Address</div>
      <div className="checkout">
        <Form
          className="checkout-form"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <div>
            <Row>
              <Col>
                <Form.Group controlId="first_name">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your first name"
                    autoComplete="off"
                    {...register("first_name", {
                      required: "First name is required.",
                      pattern: {
                        value: /^[a-zA-Z]+$/,
                        message: "First name should contain only characters.",
                      },
                    })}
                    className={`${errors.first_name ? "input-error" : ""}`}
                  />
                  {errors.first_name && (
                    <p className="errorMsg">{errors.first_name.message}</p>
                  )}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="last_name">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your last name"
                    autoComplete="off"
                    {...register("last_name", {
                      required: "Last name is required.",
                      pattern: {
                        value: /^[a-zA-Z]+$/,
                        message: "Last name should contain only characters.",
                      },
                    })}
                    className={`${errors.last_name ? "input-error" : ""}`}
                  />
                  {errors.last_name && (
                    <p className="errorMsg">{errors.last_name.message}</p>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                autoComplete="off"
                {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: "Email is not valid.",
                  },
                })}
                className={`${errors.last_name ? "input-error" : ""}`}
              />
              {errors.email && (
                <p className="errorMsg">{errors.email.message}</p>
              )}
            </Form.Group>
            <Form.Group controlId="street">
              <Form.Label>Street</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your street"
                autoComplete="off"
                {...register("street", {
                  required: "Street is required.",
                })}
                className={`${errors.street ? "input-error" : ""}`}
              />
              {errors.street && (
                <p className="errorMsg">{errors.street.message}</p>
              )}
            </Form.Group>
            <Row>
              <Col>
                <Form.Group controlId="state">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedState}
                    onChange={(event) => setSelectedState(event.target.value)}
                  >
                    {states.length > 0 ? (
                      states.map(({ isoCode, name }) => (
                        <option value={isoCode} key={isoCode}>
                          {name}
                        </option>
                      ))
                    ) : (
                      <option value="" key="">
                        No state found
                      </option>
                    )}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="city">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedCity}
                    onChange={(event) => setSelectedCity(event.target.value)}
                  >
                    {cities.length > 0 ? (
                      cities.map(({ name }) => (
                        <option value={name} key={name}>
                          {name}
                        </option>
                      ))
                    ) : (
                      <option value="">No cities found</option>
                    )}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="pincode">
              <Form.Label>Pincode</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your pincode"
                autoComplete="off"
                {...register("pincode", {
                  required: "pincode is required.",
                  minLength: {
                    value: 6,
                    message: "Pincode should have at-least 6 characters.",
                  },
                })}
                className={`${errors.pincode ? "input-error" : ""}`}
              />
              {errors.pincode && (
                <p className="errorMsg">{errors.pincode.message}</p>
              )}
            </Form.Group>
            <Form.Group>
              <Button
                type="submit"
                variant="success"
                className="final-checkout-btn"
              >
                Confirm Checkout
              </Button>
            </Form.Group>
          </div>
        </Form>
        <ul className="cart-items">
          {cart.length > 0 ? (
            cart.map(
              (
                { title, quantity, image, price, category, toppings },
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
                    <div className="flex-grow-1 product-info">
                      <h6>{title}</h6>
                      {isPizzaCategory ? (
                        formattedToppings.length > 0 ? (
                          <p>
                            <span style={{ fontWeight: "500" }}>Toppings:</span>{" "}
                            {formattedToppings.join(", ")}
                          </p>
                        ) : (
                          <p>
                            <span style={{ fontWeight: "500" }}>Toppings:</span>{" "}
                            Not selected
                          </p>
                        )
                      ) : null}
                    </div>
                    <div className="amount">
                      {quantity} x {CURRENCY} {price}
                    </div>
                  </li>
                );
              }
            )
          ) : (
            <h6>No items added in the cart</h6>
          )}
          <div className="summary-total">
            <div>Total amount</div>
            <div>
              {CURRENCY} {getCartTotal(cart)}
            </div>
          </div>
        </ul>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  const { cart } = state;

  return {
    cart: cart.data,
  };
};

export default connect(mapStateToProps)(Checkout);
