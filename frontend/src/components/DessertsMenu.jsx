import React, { useState } from "react";
const desserts = [
  {
    id: 1,
    name: "Chocolate Lava Cake",
    price: 250,
    image: "clc.png",
    description: "Warm chocolate cake with molten center",
  },
  {
    id: 2,
    name: "New York Cheesecake",
    price: 300,
    image: "cheese.png",
    description: "Classic creamy cheesecake with honey",
  },
  {
    id: 3,
    name: "Strawberry Cake",
    price: 250,
    image: "/dinner3.png",
    description: "Italian coffee-flavored dessert with mascarpone",
  },
  {
    id: 4,
    name: "Ice Cream Sundae",
    price: 200,
    image: "IceCreamSundae.png",
    description: "Vanilla ice cream with hot fudge and nuts",
  },
  {
    id: 5,
    name: "Pancake",
    price: 350,
    image: "pancake.png",
    description: "Fresh romaine lettuce with caesar dressing",
  },
  {
    id: 6,
    name: "Salted Caramel Cheesecake",
    price: 350,
    image: "saltedCaramelCheesecake.png",
    description: "Creamy cheesecake with swirls of salted caramel on a chocolate crust"
  },
  {
    id: 7,
    name: "Red Velvet Cake",
    price: 350,
    image: "redVelvet.png",
    description: "Moist red velvet cake with cream cheese frosting"
  },
  {
    id: 8,
    name: "Fruit Tart",
    price: 250,
    image: "fruitTart.png",
    description: "Sweet pastry crust with custard and fresh fruits"
  },
  
];

const DessertCard = ({ dessert, onAddToCart }) => {
  const [quantity, setQuantity] = useState(0);

  const handleAdd = () => {
    setQuantity((prev) => prev + 1);
    onAddToCart(dessert);
  };

  const handleRemove = () => {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1);
      onAddToCart({ ...dessert, remove: true });
    }
  };

  return (
    <div className="dessert-card">
      <img src={dessert.image} alt={dessert.name} className="dessert-image" />
      <div className="dessert-info">
        <h3>{dessert.name}</h3>
        <p>{dessert.description}</p>
        <p className="price">₹{dessert.price}</p>
        <div className="quantity-controls">
          <button onClick={handleRemove} disabled={quantity === 0}>
            -
          </button>
          <span>{quantity}</span>
          <button onClick={handleAdd}>+</button>
        </div>
      </div>
    </div>
  );
};

const DessertsMenu = ({ onAddToCart }) => {
  return (
    <div className="desserts-section">
      <h2>Our Desserts Menu</h2>
      <div className="desserts-grid">
        {desserts.map((dessert) => (
          <DessertCard
            key={dessert.id}
            dessert={dessert}
            onAddToCart={(item) => onAddToCart(item, "dessert")}
          />
        ))}
      </div>
      <style jsx>{`
        .desserts-section {
          padding: 2rem;
          width: 100%;
        }

        h2 {
          text-align: center;
          margin-bottom: 2rem;
          color: #333;
          font-size: 2rem;
        }

        .desserts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          padding: 1rem;
        }

        .dessert-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s;
        }

        .dessert-card:hover {
          transform: translateY(-5px);
        }

        .dessert-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .dessert-info {
          padding: 1.5rem;
        }

        .dessert-info h3 {
          margin: 0 0 0.5rem 0;
          color: #333;
          font-size: 1.25rem;
        }

        .dessert-info p {
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

export default DessertsMenu;
