import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from './CartSlice'; // Step 5: Import the addItem reducer
import './ProductList.css';

function ProductList() {
  const dispatch = useDispatch();

  // Step 1: The plantsArray containing plant objects
  const plantsArray = [
    {
      name: "Snake Plant",
      image: "https://example.com/snake.jpg",
      description: "Produces oxygen at night.",
      cost: "$15",
      category: "Air Purifying"
    },
    {
      name: "Lavender",
      image: "https://example.com/lavender.jpg",
      description: "Calming aroma for relaxation.",
      cost: "$20",
      category: "Aromatic"
    }
    // ... add more plants as needed
  ];

  // Step 4: useState to track which products are added to the cart
  // Using an object where the key is the plant name and value is true
  const [addedToCart, setAddedToCart] = useState({});

  // Step 5 & 6: Function to handle adding to cart and dispatching to global state
  const handleAddToCart = (plant) => {
    dispatch(addItem(plant)); // Dispatch to Redux store
    
    setAddedToCart((prevState) => ({
       ...prevState,
       [plant.name]: true, // Set plant name as key and value to true
    }));
  };

  return (
    <div className="product-grid-container">
      {/* Step 2: Display Plant Details within a div with class name product-grid */}
      <div className="product-grid">
        {/* Step 2: Utilize map() to iterate over the plant array */}
        {plantsArray.map((plant, index) => (
          <div key={index} className="product-card">
            <img src={plant.image} alt={plant.name} className="product-image" />
            <h2 className="product-name">{plant.name}</h2>
            <p className="product-description">{plant.description}</p>
            <p className="product-cost">{plant.cost}</p>

            {/* Step 3: Display an Add to Cart button for each plant */}
            <button 
              className="add-to-cart-button" 
              disabled={addedToCart[plant.name]} 
              onClick={() => handleAddToCart(plant)}
            >
              {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
