import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice'; // Task: Use the addItem action
import './ProductList.css';
import CartItem from './CartItem';

function ProductList() {
    const [showCart, setShowCart] = useState(false); 
    const dispatch = useDispatch();
    
    // Retrieve cart items from the Redux store
    const cartItems = useSelector(state => state.cart.items);

    // Task: Access Redux store to calculate and display total quantity
    const calculateTotalQuantity = () => {
        return cartItems ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;
    };

    const handleAddToCart = (product) => {
        // Task: Dispatch addItem to add selected product to the cart
        dispatch(addItem(product));
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true); // Navigate to cart
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false); // Navigate back to plants
    };

    return (
        <div>
            <div className="navbar" style={{ backgroundColor: '#4CAF50', color: '#fff', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '20px' }}>
                <div className="tag">Paradise Nursery</div>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <a href="#" onClick={(e) => handleContinueShopping(e)} style={{ color: 'white', textDecoration: 'none' }}>Plants</a>
                    <a href="#" onClick={(e) => handleCartClick(e)} style={{ color: 'white', textDecoration: 'none' }}>
                        <h1 className='cart'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="IconChangeColor" height="68" width="68"><rect width="256" height="256" fill="none"></rect><circle cx="80" cy="216" r="12"></circle><circle cx="184" cy="216" r="12"></circle><path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.3A8,8,0,0,0,24.8,32H8" fill="none" stroke="#faf9f9" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
                            {/* Display the total quantity here */}
                            <span className="cart_quantity_count">{calculateTotalQuantity()}</span>
                        </h1>
                    </a>
                </div>
            </div>

            {!showCart ? (
                <div className="product-grid">
                    {/* Example of a plant card structure */}
                    {plantsArray.map((product) => (
                        <div key={product.name} className="product-card">
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>{product.cost}</p>
                            <button 
                                className="product-button" 
                                // Task: Disable and update label if item is already in cart
                                disabled={cartItems.some(item => item.name === product.name)}
                                onClick={() => handleAddToCart(product)}
                            >
                                {cartItems.some(item => item.name === product.name) ? "Added to Cart" : "Add to Cart"}
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;