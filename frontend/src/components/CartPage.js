// src/components/CartPage.js
import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Form } from 'react-bootstrap';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
    calculateTotal(storedCart);
  }, []);

  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => acc + item.total, 0);
    setTotal(sum);
  };

  const handleQuantityChange = (id, newQuantity) => {
    const updated = cartItems.map(item =>
      item.id === id
        ? { ...item, quantity: newQuantity, total: newQuantity * item.price }
        : item
    );
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    calculateTotal(updated);
  };

  const handleRemove = (id) => {
    const updated = cartItems.filter(item => item.id !== id);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    calculateTotal(updated);
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
  const res = await loadRazorpayScript();
  if (!res) {
    alert("Razorpay SDK failed to load");
    return;
  }

  const response = await fetch("http://localhost:5000/api/payment/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: total }),
  });

  const data = await response.json();

  const options = {
    key: "rzp_test_1234567890abcdef", // from your env file
    amount: data.amount,
    currency: data.currency,
    order_id: data.id,
    name: "MediHub",
    description: "Medicine Purchase",
    handler: function (response) {
      alert("✅ Payment Successful!");
      localStorage.removeItem("cart");
      setCartItems([]);
      setTotal(0);
      console.log("Payment response:", response);
    },
    prefill: {
      name: "Test Patient",
      email: "test@medihub.com",
      contact: "9999999999",
    },
    theme: {
      color: "#00A86B",
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};

  return (
    <div className="container mt-4">
      <h3 className="mb-4">🛒 Your Cart</h3>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <Row>
            {cartItems.map((item) => (
              <Col md={6} key={item.id}>
                <Card className="mb-3 shadow-sm">
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>Price: ₹{item.price}</Card.Text>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, parseInt(e.target.value))
                      }
                      style={{ width: "80px" }}
                    />
                    <Card.Text className="mt-2">
                      Total: ₹{item.total}
                    </Card.Text>
                    <Button
                      variant="danger"
                      onClick={() => handleRemove(item.id)}
                    >
                      ❌ Remove
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <h4 className="mt-4">🧾 Grand Total: ₹{total}</h4>
          <Button className="mt-3" onClick={handlePayment} variant="success">
            💳 Pay Now
          </Button>
        </>
      )}
    </div>
  );
};

export default CartPage;
