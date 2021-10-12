import React from "react";
import { Modal, Button } from "react-bootstrap";
import { getFormattedPrice, getFormattedTopping } from "../utils/functions";

const ToppingsModal = ({
  showModal,
  toggleModal,
  modalTitle,
  toppings,
  checkedState,
  productQuantity,
  selectedToppingsCount,
  totalOrderPrice,
  handleQuantityChange,
  handleToppingsSelection,
  addPizzaToCart,
}) => {
  return (
    <Modal show={showModal} onHide={toggleModal} className="toppings-modal">
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="toppings-body">
        <h6>Select Toppings</h6>
        {toppings.map(({ name, price }, index) => (
          <ul key={index} className="toppings-list">
            <li>
              <div className="toppings-list-item">
                <div className="left-section">
                  <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    className="custom-checkbox"
                    name={name}
                    value={name}
                    checked={checkedState[index]}
                    onChange={() => handleToppingsSelection(index)}
                  />{" "}
                  <label htmlFor={`custom-checkbox-${index}`}>
                    {getFormattedTopping(name)}
                  </label>
                </div>
                <div className="right-section">{getFormattedPrice(price)}</div>
              </div>
            </li>
          </ul>
        ))}
        {selectedToppingsCount > 0 && (
          <React.Fragment>
            <hr />
            <div className="modal-order-total">
              Order Total: {getFormattedPrice(totalOrderPrice)}
            </div>
          </React.Fragment>
        )}
      </Modal.Body>
      <Modal.Footer>
        <div className="toppings-modal-footer">
          <div className="quantity">
            <span
              className="minus-sign"
              onClick={() => handleQuantityChange("decrement")}
            >
              &#8722;
            </span>
            <span className="product-qty">{productQuantity}</span>
            <span
              className="plus-sign"
              onClick={() => handleQuantityChange("increment")}
            >
              &#43;
            </span>
          </div>
          <Button variant="warning" onClick={addPizzaToCart}>
            Add To Cart
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ToppingsModal;
