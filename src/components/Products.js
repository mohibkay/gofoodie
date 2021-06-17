/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getAllProducts } from "../actions/productsActions";
import { getQueryStringValue } from "../utils/functions";
import Product from "./Product";
import Layout from "./Layout";

const Products = ({ dispatch, products, isLoading, isFailed, location }) => {
  const [category, setCategory] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(false);
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
                />
              )
            )
          )}
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </Layout>
  );
};

const mapStateToProps = (state) => {
  const {
    products: { data, isLoading, isFailed },
  } = state;

  return {
    products: data,
    isLoading: isLoading,
    isFailed: isFailed,
  };
};

export default connect(mapStateToProps)(Products);
