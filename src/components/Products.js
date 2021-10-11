/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getAllProducts } from "../actions/productsActions";
import { getToppings } from "../actions/toppingsActions";
import { getQueryStringValue } from "../utils/functions";
import Product from "./Product";
import Layout from "./Layout";
import ToppingsModal from "./ToppingsModal";

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

  useEffect(() => {
    setFilteredResults(products);
  }, [products]);

  useEffect(() => {
    dispatch(getToppings());
  }, []);

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

  const addProduct = () => {
    const { id, title, image } = selectedProduct;
    console.log({ selectedProduct });
    setShowModal(!showModal);
    // toast.success('Product added successfully.');
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
        addProduct={addProduct}
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
