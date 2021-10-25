import React, { useContext, useEffect } from "react";
import Confetti from "react-confetti";

//Components
import Layout from "../components/Layout";
import CartContext from "../context/CartContext";

const PaymentSuccessPage = () => {
  const { setItems } = useContext(CartContext);

  useEffect(() => {
    setItems([]);
  }, [setItems]);

  return (
    <Layout>
      <div className="order-success">
        <div className="order-success-message">
          <h4>Order placed successfully!</h4>
          <p>Please, check your email for details regarding the order.</p>
        </div>
      </div>
      <Confetti />
    </Layout>
  );
};

export default PaymentSuccessPage;
