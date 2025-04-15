import React, { useState } from "react";

const drinks = [
  {
    id: 1,
    name: "Fresh Mojito",
    price: 180,
    image: "Mojito.png",
    description: "A refreshing blend of mint and lime, perfectly mixed with rum for a delightful experience."
  },
  {
    id: 2,
    name: "Strawberry Smoothie",
    price: 160,
    image: "strawberrySmoothie.png", 
    description: "A creamy smoothie made with fresh strawberries and yogurt, perfect for a hot day."
  },
  {
    id: 3,
    name: "Iced Coffee",
    price: 120,
    image: "icedCoffee.png ",
    description: "Smooth cold brewed coffee blended with cream, ideal for coffee lovers."
  },
  {
    id: 4,
    name: "Tropical Punch",
    price: 160,
    image: "TropicalPunch.png", 
    description: "A vibrant mix of tropical fruits and juices, bringing a taste of paradise to your glass."
  },
  {
    id: 5,
    name: "Lemonade",
    price: 80,
    image: "lemonade.png",
    description: "A classic refreshing drink made with fresh lemons and a hint of mint."
  },
  {
    id: 6,
    name: "Peach Iced Tea",
    price: 100,
    image: "peachIcedTea.png",
    description: "A sweet and refreshing iced tea infused with peach flavor."
  },
  {
    id: 7,
    name: "Mango Lassi",
    price: 120,
    image: "mangoLassi.png",
    description: "A traditional Indian yogurt drink blended with ripe mango`es for a creamy delight."
  },
  {
    id: 8,
    name: "Berry Fizz",
    price: 140,
    image: "berryFizz.png",
    description: "A sparkling drink made with mixed berries and a splash of soda for a refreshing taste."
  }
];

const DrinkCard = ({ drink, onAddToCart }) => {
  const [quantity, setQuantity] = useState(0);

  const handleAdd = () => {
    setQuantity(prev => prev + 1);
    onAddToCart(drink);
  };

  const handleRemove = () => {
    if (quantity > 0) {
      setQuantity(prev => prev - 1);
      // Note: This assumes the parent component can handle removing items
      onAddToCart({ ...drink, remove: true });
    }
  };

  return (
    <div className="drink-card">
      <img src={drink.image} alt={drink.name} className="drink-image" />
      <div className="drink-info">
        <h3>{drink.name}</h3>
        <p>{drink.description}</p>
        <p className="price">₹{drink.price}</p>
        <div className="quantity-controls">
          <button onClick={handleRemove} disabled={quantity === 0}>-</button>
          <span>{quantity}</span>
          <button onClick={handleAdd}>+</button>
        </div>
      </div>
    </div>
  );
};

const DrinksMenu = ({ onAddToCart }) => {
  return (
    <div className="drinks-section">
      <h2>Our Drinks Menu</h2>
      <div className="drinks-grid">
        {drinks.map((drink) => (
          <DrinkCard
            key={drink.id}
            drink={drink}
            onAddToCart={(item) => onAddToCart(item, 'drink')}
          />
        ))}
      </div>
      <style jsx>{`
        .drinks-section {
          padding: 2rem;
          width: 100%;
        }
        
        h2 {
          text-align: center;
          margin-bottom: 2rem;
          color: #333;
          font-size: 2rem;
        }
        
        .drinks-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          padding: 1rem;
        }
        
        .drink-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s;
        }
        
        .drink-card:hover {
          transform: translateY(-5px);
        }
        
        .drink-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }
        
        .drink-info {
          padding: 1.5rem;
        }
        
        .drink-info h3 {
          margin: 0 0 0.5rem 0;
          color: #333;
          font-size: 1.25rem;
        }
        
        .drink-info p {
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

export default DrinksMenu; 