import React, { useState } from "react";
const foods = [
  {
    id: 1,
    name: "Sushi",
    price: 1299,
    image: "sushi.jpg",
    description: "Classic pizza with tomato sauce and mozzarella"
  },
  {
    id: 2,
    name: "Pizza",
    price: 999,
    image: "Pizza.png",
    description: "Grilled chicken patty with fresh vegetables"
  },
  {
    id: 3,
    name: "Vadapav",
    price: 1199,
    image: "vadapav.png",
    description: "Creamy pasta with parmesan cheese"
  },
  {
    id: 4,
    name: "Full Indian Cuisine",
    price: 899,
    image: "fullIndianCuisine.png ",
    description: "Fresh romaine lettuce with caesar dressing"
  },
  {
    id: 5,
    name: "chickenTikka",
    price: 899,
    image: "chikenTikka.png",
    description: "Fresh romaine lettuce with caesar dressing"
  },
  {
    id: 6,
    name: "South Indian",
    price: 599,
    image: "si.png",
    description: "Vanilla ice cream with hot fudge and nuts"
  },
];

const FoodCard = ({ food, onAddToCart }) => {
  const [quantity, setQuantity] = useState(0);

  const handleAdd = () => {
    setQuantity(prev => prev + 1);
    onAddToCart(food);
  };

  const handleRemove = () => {
    if (quantity > 0) {
      setQuantity(prev => prev - 1);
      // Note: This assumes the parent component can handle removing items
      onAddToCart({ ...food, remove: true });
    }
  };

  return (
    <div className="food-card">
      <img src={food.image} alt={food.name} className="food-image" />
      <div className="food-info">
        <h3>{food.name}</h3>
        <p>{food.description}</p>
        <p className="price">₹{food.price}</p>
        <div className="quantity-controls">
          <button onClick={handleRemove} disabled={quantity === 0}>-</button>
          <span>{quantity}</span>
          <button onClick={handleAdd}>+</button>
        </div>
      </div>
    </div>
  );
};

const FoodsMenu = ({ onAddToCart }) => {
  return (
    <div className="foods-section">
      <h2>Our Foods Menu</h2>
      <div className="foods-grid">
        {foods.map((food) => (
          <FoodCard
            key={food.id}
            food={food}
            onAddToCart={(item) => onAddToCart(item, 'food')}
          />
        ))}
      </div>
      <style jsx>{`
        .foods-section {
          padding: 2rem;
          width: 100%;
        }
        
        h2 {
          text-align: center;
          margin-bottom: 2rem;
          color: #333;
          font-size: 2rem;
        }
        
        .foods-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          padding: 1rem;
        }
        
        .food-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s;
        }
        
        .food-card:hover {
          transform: translateY(-5px);
        }
        
        .food-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }
        
        .food-info {
          padding: 1.5rem;
        }
        
        .food-info h3 {
          margin: 0 0 0.5rem 0;
          color: #333;
          font-size: 1.25rem;
        }
        
        .food-info p {
          color: #666;
          margin: 0 0 1rem 0;
        }
        
        .price {
          font-weight: bold;
          color: #2c5282 !important;
          font-size: 1.25rem;
        }
        
        .quantity-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-top: 1rem;
        }
        
        .quantity-controls button {
          background: #2c5282;
          color: white;
          border: none;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s;
        }
        
        .quantity-controls button:disabled {
          background: #cbd5e0;
          cursor: not-allowed;
        }
        
        .quantity-controls button:not(:disabled):hover {
          background: #1a365d;
        }
        
        .quantity-controls span {
          font-size: 1.1rem;
          font-weight: 500;
          min-width: 20px;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default FoodsMenu; 