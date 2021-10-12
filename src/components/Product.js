import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Rating from "react-rating";
import { MAX_DESCRIPTION_CHARS } from "../utils/constants";
import { getFormattedPrice } from "../utils/functions";

const Product = ({
  id,
  title,
  description,
  price,
  quantity,
  image,
  rating,
  toggleModal,
  isVeg,
  category,
  changeProductCount,
  addProductToCart,
}) => {
  const [productQuantity, setProductQuantity] = useState(1);

  const displayDescription = (description) => {
    if (description.length > MAX_DESCRIPTION_CHARS) {
      return (
        <span title={description}>
          {description.substring(0, MAX_DESCRIPTION_CHARS)}...
        </span>
      );
    } else {
      return <span title={description}>{description}</span>;
    }
  };

  const addItem = () => {
    if (category === "pizza") {
      toggleModal(id, title, image, price);
    } else {
      addProductToCart(id, title, image, price);
    }
  };

  const showIcons = () => {
    const isPizzaCategory = category === "pizza";
    if (isPizzaCategory) {
      if (isVeg) {
        return (
          <img
            src="/images/veg_icon.png"
            alt="Veg Icon"
            className="small-icons"
          />
        );
      } else {
        return (
          <img
            src="/images/non_veg_icon.png"
            alt="Non Veg Icon"
            className="small-icons"
          />
        );
      }
    }
  };

  const isOutOfStock = quantity === 0;

  return (
    <React.Fragment>
      <div className={`${isOutOfStock ? "product out-of-stock" : "product"}`}>
        <div className="image-container">
          <img src={image} alt={title} className="product-img" />
        </div>
        <div className="product-info">
          <div className="title-section">
            <h5 className="product-title">
              <span>{title}</span>
              {showIcons()}
              {isOutOfStock && <span className="oos">Out of stock</span>}
            </h5>
            {false ? (
              <div
                disabled={isOutOfStock}
                className={`${
                  isOutOfStock
                    ? "btn-disabled quantity qty-btn"
                    : "quantity qty-btn"
                }`}
              >
                <span
                  className="minus-sign"
                  onClick={
                    !isOutOfStock
                      ? () => changeProductCount(id, "decrement")
                      : null
                  }
                >
                  &#8722;
                </span>
                <span className="product-qty">{productQuantity}</span>
                <span
                  className="plus-sign"
                  onClick={
                    !isOutOfStock
                      ? () => changeProductCount(id, "increment")
                      : null
                  }
                >
                  &#43;
                </span>
              </div>
            ) : (
              <Button
                variant="warning"
                disabled={isOutOfStock}
                type="button"
                className={`${
                  isOutOfStock ? "btn-disabled add-btn" : "add-btn"
                }`}
                onClick={!isOutOfStock ? addItem : null}
              >
                Add
              </Button>
            )}
          </div>
          <div className="rating">
            <Rating
              quiet
              readonly
              className="rating-stars"
              placeholderRating={rating}
              emptySymbol={
                <img
                  src="/images/star-empty.png"
                  className="star-icon"
                  alt="empty star icon"
                />
              }
              placeholderSymbol={
                <img
                  src="/images/star-full.png"
                  className="star-icon"
                  alt="full star icon"
                />
              }
            />
            <span className="rating-value">{rating}</span>
          </div>
          {description && (
            <p className="product-description">
              {displayDescription(description)}
            </p>
          )}
          <div className="product-price">{getFormattedPrice(price, 0)}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Product;
