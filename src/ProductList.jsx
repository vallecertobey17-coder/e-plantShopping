import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';
import CartItem from './CartItem';

function ProductList({ onHomeClick }) {
    const dispatch = useDispatch();
    const [showCart, setShowCart] = useState(false);
    
    // Step 4: useState to track which products are added to the cart
    const [addedToCart, setAddedToCart] = useState({});

    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night.", cost: "$15" },
                { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde and xylene.", cost: "$12" },
                // ... rest of your plants
            ]
        },
        // ... rest of your categories
    ];

    // Step 5 & 6: Function to handle adding to cart and updating global/local state
    const handleAddToCart = (plant) => {
        dispatch(addItem(plant)); // Dispatch to Redux Store
        setAddedToCart((prevState) => ({
            ...prevState,
            [plant.name]: true, // Step 5: Update state using plant name as key
        }));
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
            {/* Navbar remains same as your code */}
            <div className="navbar" style={{ backgroundColor: '#4CAF50', color: '#fff', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="luxury">
                    <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" height="50px" />
                    <a href="/" onClick={(e) => {e.preventDefault(); onHomeClick();}} style={{textDecoration:'none', color:'white'}}>
                        <div>
                            <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                            <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
                        </div>
                    </a>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '200px', alignItems: 'center' }}>
                    <a href="#" onClick={(e) => e.preventDefault()} style={{color: 'white', fontSize: '20px', textDecoration: 'none'}}>Plants</a>
                    <a href="#" onClick={(e) => handleCartClick(e)} style={{color: 'white', textDecoration: 'none'}}>
                        <h1 className='cart'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" height="40" width="40"><rect width="156" height="156" fill="none"></rect><circle cx="80" cy="216" r="12"></circle><circle cx="184" cy="216" r="12"></circle><path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8" fill="none" stroke="#faf9f9" strokeWidth="2"></path></svg></h1>
                    </a>
                </div>
            </div>

            {!showCart ? (
                <div className="product-grid">
                    {/* Step 2: Utilize map() to iterate over the categories and plants */}
                    {plantsArray.map((category, index) => (
                        <div key={index}>
                            <h1 style={{textAlign: 'center', margin: '20px'}}>{category.category}</h1>
                            <div className="product-list">
                                {category.plants.map((plant, plantIndex) => (
                                    <div className="product-card" key={plantIndex}>
                                        <img className="product-image" src={plant.image} alt={plant.name} />
                                        <div className="product-title">{plant.name}</div>
                                        <p>{plant.description}</p>
                                        <div className="product-cost">{plant.cost}</div>
                                        
                                        {/* Step 3: Add to Cart button */}
                                        <button 
                                            className="product-button" 
                                            disabled={addedToCart[plant.name]} 
                                            onClick={() => handleAddToCart(plant)}
                                        >
                                            {addedToCart[plant.name] ? "Added" : "Add to Cart"}
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

export default ProductList;
