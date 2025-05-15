import React, { useState } from 'react';
import './Checkout.css';

const Checkout = ({ cart, onClose, setCart }) => {
    console.log('Cart data:', cart);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState(null);
    
    const subtotal = cart.reduce((price, item) => price + item.qty * item.price, 0);
    const shippingFee = 30;
    const total = subtotal + shippingFee;

    const handleConfirm = async () => {
        setIsProcessing(true);
        setError(null);
        
        try {
            // Prepare cart items in correct format
            const cartItems = cart.map(item => ({
                _id: item._id,  // match backend expectation
                qty: item.qty
                }));

            const response = await fetch('http://localhost:5000/api/cart/checkout', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // for cookies
                body: JSON.stringify({ cartItems })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Checkout failed');
            }

            const result = await response.json();
            setOrderPlaced(true);
            setCart([]);
            setTimeout(onClose, 3000);
            
        } catch (error) {
            setError(error.message);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="checkout-overlay">
            <div className="checkout-modal">
                <button className="close-btn" onClick={onClose}>×</button>

                {orderPlaced ? (
                    <div className="success-message">
                        <img src="https://cdn-icons-png.flaticon.com/512/845/845646.png" alt="Success" className="success-icon" />
                        <h3>Your order was placed successfully!</h3>
                    </div>
                ) : (
                    <>
                        <h2>Checkout</h2>
                        {error && <div className="error-message">{error}</div>}
                        
                        <div className="your-order">
                            <h3>Your Order</h3>
                            {cart.map((item) => (
                                <div className="order-item" key={item.id}>
                                    <p><strong>Product:</strong> {item.Name}</p>
                                    <p>{item.qty} × ${item.price}</p>
                                </div>
                            ))}
                            <div className="order-summary">
                                <div className="summary-row">
                                    <span>Subtotal:</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Shipping:</span>
                                    <span>${shippingFee.toFixed(2)}</span>
                                </div>
                                <div className="summary-row total-row">
                                    <span>Total:</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                        
                        <button 
                            className="confirm-btn" 
                            onClick={handleConfirm}
                            disabled={isProcessing || cart.length === 0}
                        >
                            {isProcessing ? 'Processing...' : 'Confirm Order'}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Checkout;