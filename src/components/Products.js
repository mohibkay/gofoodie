/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getAllProducts } from "../actions/productsActions";
import { getToppings } from "../actions/toppingsActions";
import { getQueryStringValue } from "../utils/functions";
import Product from "./Product";
import Layout from "./Layout";
import ToppingsModal from "./ToppingsModal";
import { addToCartAction } from "../actions/cardActions";

const Products = ({
  dispatch,
  products,
  toppings,
  isLoading,
  isFailed,
  location,
}) => {
  const [category, setCategory] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(false);
  const [checkedState, setCheckedState] = useState([]);
  const [productQuantity, setProductQuantity] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [selectedToppingsCount, setSelectedToppingsCount] = useState(0);
  const [totalOrderPrice, setTotalOrderPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const { search = "" } = location;
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (search) {
      const category = getQueryStringValue(search, "search");
      setCategory(category);
      dispatch(getAllProducts(category));
    }
  }, []);

  const emptyArrayRef = useRef([]);

  useEffect(() => {
    setFilteredResults(products);
  }, [products]);

  useEffect(() => {
    dispatch(getToppings());
  }, []);

  useEffect(() => {
    emptyArrayRef.current = new Array(toppings.length).fill(false);
    setCheckedState(emptyArrayRef.current);
  }, [toppings.length]);

  useEffect(() => {
    if (selectedProduct.price >= 0 && selectedToppingsCount > 0) {
      setTotalOrderPrice(selectedProduct.price + selectedProduct.productPrice);
    } else if (selectedProduct.price >= 0) {
      setTotalOrderPrice(selectedProduct.price);
    }
  }, [selectedProduct.price, selectedToppingsCount]);

  const toggleModal = (id, title, image, price) => {
    if (id) {
      setSelectedProduct({
        id,
        title,
        image,
        price,
        productPrice: price,
      });
      setModalTitle(title);
    }
    setShowModal(!showModal);
  };

  const resetState = () => {
    setSelectedProduct({});
    setCheckedState(emptyArrayRef.current);
    setProductQuantity(1);
    setSelectedToppingsCount(0);
    setTotalOrderPrice(0);
  };

  const addPizzaToCart = () => {
    const { id, title, image } = selectedProduct;

    let isAlreadyAdded = false;
    const isPizzaCategory = category === "pizza";
    let cart = cartProducts.map((cartProduct) => {
      if (cartProduct.id === id) {
        isAlreadyAdded = true;
        cartProduct.quantity = productQuantity;
        cartProduct.price = totalOrderPrice;
        cartProducts.category = category;
        if (isPizzaCategory) {
          cartProduct.toppings = checkedState
            .map((isChecked, index) =>
              isChecked ? toppings[index].name : null
            )
            .filter(Boolean);
        }
        return cartProduct;
      } else {
        return cartProduct;
      }
    });

    if (!isAlreadyAdded) {
      cart = [
        ...cart,
        {
          id,
          title,
          image,
          toppings: isPizzaCategory
            ? checkedState
                .map((isChecked, index) =>
                  isChecked ? toppings[index].name : null
                )
                .filter(Boolean)
            : null,
          quantity: productQuantity,
          price: totalOrderPrice,
          category,
        },
      ];

      if (isPizzaCategory) {
        // remove toppings from non-pizza category products
        cart = cart.map((item) => {
          if (
            (item.category === "pizza" && item.toppings.length > 0) ||
            item.category === "pizza"
          ) {
            return item;
          } else {
            delete item.toppings;
            return item;
          }
        });
      }
    }

    setCartProducts(cart);
    resetState();
    setShowModal((showModal) => !showModal);
    dispatch(addToCartAction(cart));
  };

  const addProductToCart = (id, title, image, price) => {
    const cart = [
      ...cartProducts,
      {
        id,
        title,
        image,
        quantity: productQuantity,
        price,
        category,
      },
    ];
    setCartProducts(cart);
    dispatch(addToCartAction(cart));
  };

  const handleToppingsSelection = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
    setSelectedToppingsCount(
      updatedCheckedState.filter((value) => value === true).length
    );

    const totalPrice = updatedCheckedState.reduce(
      (sum, currentState, index) => {
        if (currentState === true) {
          return sum + toppings[index].price;
        }
        return sum;
      },
      0
    );

    setSelectedProduct({
      ...selectedProduct,
      price: totalPrice,
    });
  };

  const handleQuantityChange = (operation) => {
    if (operation === "increment") {
      setProductQuantity(productQuantity + 1);
    } else if (operation === "decrement") {
      setProductQuantity(productQuantity > 1 ? productQuantity - 1 : 1);
    }
  };

  const handleFilterChange = () => {
    const isVeg = !selectedFilter;
    setSelectedFilter(isVeg);
    const result = isVeg
      ? products.filter((product) => product.is_veg === isVeg)
      : products;
    setFilteredResults(result);
  };

  return (
    <Layout>
      {search ? (
        <div className="products">
          <div className="main-title">{category}</div>
          {category === "pizza" && (
            <div className="filters">
              <input
                type="checkbox"
                id="filter"
                className="custom-checkbox"
                name="filter"
                value="veg-only"
                checked={selectedFilter}
                onChange={handleFilterChange}
              />{" "}
              <label htmlFor="filter">Veg only</label>
            </div>
          )}
          {isFailed && (
            <p className="error-msg">
              Error while loading products. Please try again.
            </p>
          )}
          {isLoading ? (
            <p className="loading">Loading...</p>
          ) : (
            filteredResults.map(
              ({
                _id,
                name,
                description,
                price,
                quantity,
                rating,
                image,
                is_veg,
              }) => (
                <Product
                  key={_id}
                  id={_id}
                  title={name}
                  description={description}
                  price={price}
                  quantity={quantity}
                  rating={rating}
                  image={image?.url}
                  isVeg={is_veg}
                  category={category}
                  toggleModal={toggleModal}
                  addProductToCart={addProductToCart}
                />
              )
            )
          )}
        </div>
      ) : (
        <Redirect to="/" />
      )}
      <ToppingsModal
        showModal={showModal}
        toggleModal={toggleModal}
        modalTitle={modalTitle}
        toppings={toppings}
        checkedState={checkedState}
        productQuantity={productQuantity}
        selectedToppingsCount={selectedToppingsCount}
        totalOrderPrice={totalOrderPrice}
        handleQuantityChange={handleQuantityChange}
        handleToppingsSelection={handleToppingsSelection}
        addPizzaToCart={addPizzaToCart}
      />
    </Layout>
  );
};

const mapStateToProps = (state) => {
  const {
    products: { data, isLoading, isFailed },
    toppings,
  } = state;

  return {
    products: data,
    isLoading,
    isFailed,
    toppings: toppings.data,
  };
};

export default connect(mapStateToProps)(Products);
