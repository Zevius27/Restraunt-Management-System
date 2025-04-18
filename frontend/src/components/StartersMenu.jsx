import React, { useState } from "react";
const starters = [
  {
    id: 1,
    name: "Steak",
    price: 400,
    image: "/steak.png",
    description: "Juicy grilled steak served with herbs."
  },
  {
    id: 2,
    name: "Honey Glazed Salmon",
    price: 850,
    image: "/dinner2.png",
    description: "Fresh salmon fillet glazed with honey, served with crusty bread."
  },
  {
    id: 3,
    name: "Strawberry Cake",
    price: 350,
    image: "/dinner3.png",
    description: "Delicious strawberry cake topped with fresh strawberries."
  },
  {
    id: 4,
    name: "Roasted Toast Soup",
    price: 300,
    image: "/dinner4.png",
    description: "A delicious soup with roasted toast pieces."
  },
  {
    id: 5,
    name: "noodles",
    price: 200,
    image: "/dinner5.png",
    description: "Delicious noodles cooked to perfection with a savory sauce."
  }
];

const StarterCard = ({ starter, onAddToCart }) => {
  const [quantity, setQuantity] = useState(0);

  const handleAdd = () => {
    setQuantity(prev => prev + 1);
    onAddToCart(starter);
  };

  const handleRemove = () => {
    if (quantity > 0) {
      setQuantity(prev => prev - 1);
      onAddToCart({ ...starter, remove: true });
    }
  };

  return (
    <div className="starter-card">
      <img src={starter.image} alt={starter.name} className="starter-image" />
      <div className="starter-info">
        <h3>{starter.name}</h3>
        <p>{starter.description}</p>
        <p className="price">₹{starter.price}</p>
        <div className="quantity-controls">
          <button onClick={handleRemove} disabled={quantity === 0}>-</button>
          <span>{quantity}</span>
          <button onClick={handleAdd}>+</button>
        </div>
      </div>
    </div>
  );
};

const StartersMenu = ({ onAddToCart }) => {
  return (
    <div className="starters-section">
      <h2>Our Starters Menu</h2>
      <div className="starters-grid">
        {starters.map((starter) => (
          <StarterCard
            key={starter.id}
            starter={starter}
            onAddToCart={(item) => onAddToCart(item, 'starter')}
          />
        ))}
      </div>
      <style jsx>{`
        .starters-section {
          padding: 2rem;
          width: 100%;
        }
        
        h2 {
          text-align: center;
          margin-bottom: 2rem;
          color: #333;
          font-size: 2rem;
        }
        
        .starters-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          padding: 1rem;
        }
        
        .starter-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s;
        }
        
        .starter-card:hover {
          transform: translateY(-5px);
        }
        
        .starter-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }
        
        .starter-info {
          padding: 1.5rem;
        }
        
        .starter-info h3 {
          margin: 0 0 0.5rem 0;
          color: #333;
          font-size: 1.25rem;
        }
        
        .starter-info p {
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

export default StartersMenu; 