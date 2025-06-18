import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';


const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        const cleanedCart = cart.map(item => ({
            ...item,
            price: Number(item.price.toString().replace(/[^\d.]/g, '')),
            quantity: item.quantity && !isNaN(item.quantity) ? Number(item.quantity) : 1,
        }));

        setCartItems(cleanedCart);
    }, []);

    const updateLocalStorage = (updatedCart) => {
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleRemove = (index) => {
        const updatedCart = [...cartItems];
        updatedCart.splice(index, 1);
        updateLocalStorage(updatedCart);
    };

    const handleQuantityChange = (index, delta) => {
        const updatedCart = [...cartItems];
        const item = updatedCart[index];
        const newQty = item.quantity + delta;
        if (newQty < 1) return;
        item.quantity = newQty;
        updateLocalStorage(updatedCart);
    };

    const total = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const handleCheckout = async () => {
        const amount = total.toFixed(2);
        try {
            const res = await axios.post('http://localhost:5000/api/payment/create-order', {
                amount,
                items: cartItems,
                userId: null // or the logged-in user ID
            });

            const { orderId } = res.data;

            const options = {
                key: 'YOUR_RAZORPAY_KEY_ID',
                amount: amount * 100,
                currency: 'INR',
                name: 'MediHub Store',
                description: 'Medicine Purchase',
                order_id: orderId,
                handler: async function (response) {
                    const verifyRes = await axios.post('http://localhost:5000/api/payment/verify', {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature
                    });

                    if (verifyRes.data.success) {
                        alert('✅ Payment Successful!');
                        localStorage.removeItem('cart');
                        setCartItems([]);
                    } else {
                        alert('❌ Payment Verification Failed');
                    }
                },
                theme: { color: '#3399cc' }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error(err);
            alert('❌ Failed to initiate payment');
        }
    };


    return (
        <div className="container mt-5">
            <h2>🛒 Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <Row>
                        {cartItems.map((item, index) => (
                            <Col md={4} key={index} className="mb-4">
                                <Card className="h-100">
                                    <Card.Body>
                                        <Card.Title>{item.name}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{item.category}</Card.Subtitle>
                                        <Card.Text>
                                            {item.description}<br />
                                            <strong>Price:</strong> ₹{item.price}<br />
                                            <strong>Quantity:</strong>{' '}
                                            <Button
                                                size="sm"
                                                variant="outline-secondary"
                                                onClick={() => handleQuantityChange(index, -1)}
                                            >
                                                −
                                            </Button>{' '}
                                            <span className="mx-2">{item.quantity}</span>
                                            <Button
                                                size="sm"
                                                variant="outline-secondary"
                                                onClick={() => handleQuantityChange(index, 1)}
                                            >
                                                +
                                            </Button>
                                        </Card.Text>
                                        <Button variant="danger" onClick={() => handleRemove(index)}>
                                            ❌ Remove
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <h4 className="mt-4">🧾 Total: ₹{total.toFixed(2)}</h4>
                    <Button className="mt-3" variant="success" onClick={handleCheckout}>
                        💳 Checkout & Pay
                    </Button>

                </>
            )}
        </div>
    );
};

export default CartPage;
