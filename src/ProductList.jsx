import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';
import CartItem from './CartItem';

function ProductList({ onHomeClick }) {
    const [showCart, setShowCart] = useState(false);
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    // Standard Plant Data for the project
    const plantsArray = [
        {
            category: "Air Purifying",
            plants: [
                { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", cost: "$15", description: "Produces oxygen at night." },
                { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", cost: "$12", description: "Filters formaldehyde." }
            ]
        },
        {
            category: "Aromatic",
            plants: [
                { name: "Lavender", image: "https://images.unsplash.com/photo-1506173186414-9914adc49182", cost: "$20", description: "Calming scent." },
                { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", cost: "$10", description: "Invigorating aroma." }
            ]
        }
    ];

    const calculateTotalQuantity = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const handleAddToCart = (product) => {
        dispatch(addItem(product));
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    return (
        <div>
            <div className="navbar" style={{ backgroundColor: '#4CAF50', color: '#fff', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '20px' }}>
                <div className="tag" onClick={(e) => onHomeClick(e)} style={{cursor:'pointer'}}>Paradise Nursery</div>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <a href="#" onClick={(e) => handleContinueShopping(e)} style={{ color: 'white', textDecoration: 'none' }}>Plants</a>
                    <a href="#" onClick={(e) => handleCartClick(e)} style={{ color: 'white', textDecoration: 'none' }}>
                        <h1 className='cart'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" height="68" width="68"><rect width="256" height="256" fill="none"></rect><circle cx="80" cy="216" r="12"></circle><circle cx="184" cy="216" r="12"></circle><path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.3A8,8,0,0,0,24.8,32H8" fill="none" stroke="#faf9f9" stroke-width="2"></path></svg>
                            <span className="cart_quantity_count">{calculateTotalQuantity()}</span>
                        </h1>
                    </a>
                </div>
            </div>

            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((category, index) => (
                        <div key={index}>
                            <h2 style={{textAlign: 'center', margin: '20px'}}>{category.category}</h2>
                            <div className="product-list">
                                {category.plants.map((product) => (
                                    <div key={product.name} className="product-card">
                                        <img src={product.image} alt={product.name} style={{width: '200px', height: '200px'}} />
                                        <h3>{product.name}</h3>
                                        <p>{product.description}</p>
                                        <p><b>{product.cost}</b></p>
                                        <button 
                                            className="product-button" 
                                            disabled={cartItems.some(item => item.name === product.name)}
                                            onClick={() => handleAddToCart(product)}
                                        >
                                            {cartItems.some(item => item.name === product.name) ? "Added to Cart" : "Add to Cart"}
                                        </button>
                                    </div>
                                ))}
                            </div>
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