import React, { useState, useEffect } from "react";
import DrinksMenu from "../../components/DrinksMenu";
import FoodsMenu from "../../components/FoodsMenu";
import StartersMenu from "../../components/StartersMenu";
import DessertsMenu from "../../components/DessertsMenu";

/**
 * The Menu component renders a section of the page that displays a menu.
 * It contains different menu sections including drinks and other categories.
 */

const Menu = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('starter');

  const addToCart = (item, type) => {
    // If the item has the remove flag, handle removal
    if (item.remove) {
      removeFromCart(item.id, type);
      return;
    }

    const existingItem = cart.find(i => i.id === item.id && i.type === type);
    if (existingItem) {
      setCart(cart.map(i => 
        i.id === item.id && i.type === type 
          ? { ...i, quantity: i.quantity + 1 }
          : i
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1, type }]);
    }
  };

  const removeFromCart = (itemId, type) => {
    const existingItem = cart.find(i => i.id === itemId && i.type === type);
    if (existingItem.quantity === 1) {
      setCart(cart.filter(i => !(i.id === itemId && i.type === type)));
    } else {
      setCart(cart.map(i =>
        i.id === itemId && i.type === type
          ? { ...i, quantity: i.quantity - 1 }
          : i
      ));
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const renderActiveMenu = () => {
    switch (activeTab) {
      case 'starter':
        return <StartersMenu onAddToCart={addToCart} />;
      case 'food':
        return <FoodsMenu onAddToCart={addToCart} />;
      case 'drink':
        return <DrinksMenu onAddToCart={addToCart} />;
      case 'dessert':
        return <DessertsMenu onAddToCart={addToCart} />;
      default:
        return <StartersMenu onAddToCart={addToCart} />;
    }
  };

  return (
    <div className="menu-container">
      <h1>Our Menu</h1>
      <div className="menu-tabs">
        <button 
          className={`tab-btn ${activeTab === 'starter' ? 'active' : ''}`}
          onClick={() => setActiveTab('starter')}
        >
          Starters
        </button>
        <button 
          className={`tab-btn ${activeTab === 'food' ? 'active' : ''}`}
          onClick={() => setActiveTab('food')}
        >
          Main Course
        </button>
        <button 
          className={`tab-btn ${activeTab === 'drink' ? 'active' : ''}`}
          onClick={() => setActiveTab('drink')}
        >
          Drinks
        </button>
        <button 
          className={`tab-btn ${activeTab === 'dessert' ? 'active' : ''}`}
          onClick={() => setActiveTab('dessert')}
        >
          Desserts
        </button>
      </div>

      <button className="cart-toggle" onClick={() => setIsCartOpen(!isCartOpen)}>
        🛒 Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
      </button>
      
      {isCartOpen && (
        <div className="cart-modal">
          <div className="cart-header">
            <h2>Your Cart</h2>
            <button className="close-cart" onClick={() => setIsCartOpen(false)}>×</button>
          </div>
          <div className="cart-content">
            {cart.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <>
                {cart.map((item) => (
                  <div key={`${item.type}-${item.id}`} className="cart-item">
                    <div className="cart-item-info">
                      <h3>{item.name}</h3>
                      <p>₹{item.price} x {item.quantity}</p>
                    </div>
                    <div className="cart-item-controls">
                      <button onClick={() => removeFromCart(item.id, item.type)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => addToCart(item, item.type)}>+</button>
                    </div>
                  </div>
                ))}
                <div className="cart-total">
                  <h3>Total: ₹{calculateTotal().toFixed(2)}</h3>
                  <button className="checkout-btn">Proceed to Checkout</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      
      {renderActiveMenu()}
      
      <style jsx>{`
        .menu-container {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          user-select: none;
        }
        
        /* Global scrollbar styling */
        ::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 20px;
        }
        
        ::-webkit-scrollbar-thumb {
          background-color: rgba(44, 82, 130, 0.5);
          border-radius: 20px;
          border: 2px solid rgba(0, 0, 0, 0.05);
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background-color: rgba(44, 82, 130, 0.8);
        }
        
        /* Firefox */
        * {
          scrollbar-width: auto;
          scrollbar-color: rgba(44, 82, 130, 0.5) rgba(0, 0, 0, 0.05);
          user-select: none;
        }
        
        h1 {
          text-align: center;
          margin-bottom: 2rem;
          color: #333;
          font-size: 2.5rem;
        }

        .menu-tabs {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .tab-btn {
          padding: 0.75rem 2rem;
          font-size: 1.1rem;
          border: none;
          background: #edf2f7;
          color: #4a5568;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .tab-btn.active {
          background: #2c5282;
          color: white;
        }

        .cart-toggle {
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 10px 20px;
          background: #2c5282;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1.1rem;
          z-index: 100;
        }

        .cart-modal {
          position: fixed;
          top: 0;
          right: 0;
          width: 100%;
          max-width: 400px;
          height: 100vh;
          background: white;
          box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          overflow-y: auto;
        }

        .cart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          border-bottom: 1px solid #eee;
        }

        .close-cart {
          background: none;
          border: none;
          font-size: 2rem;
          color: #666;
          cursor: pointer;
          padding: 0;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: background-color 0.2s;
        }

        .close-cart:hover {
          background: #f0f0f0;
        }

        .cart-content {
          padding: 1.5rem;
          max-height: 70vh;
          overflow-y: auto;
        }

        .cart-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 0;
          border-bottom: 1px solid #eee;
        }

        .cart-item-info h3 {
          margin: 0;
          font-size: 1.1rem;
        }

        .cart-item-info p {
          margin: 0.5rem 0 0 0;
          color: #666;
        }

        .cart-item-controls {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .cart-item-controls button {
          background: #2c5282;
          color: white;
          border: none;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cart-total {
          margin-top: 2rem;
          padding-top: 1rem;
          border-top: 2px solid #eee;
        }

        .checkout-btn {
          width: 100%;
          padding: 1rem;
          background: #2c5282;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1.1rem;
          margin-top: 1rem;
        }

        .checkout-btn:hover {
          background: #1a365d;
        }

        /* Style for the menu component containers to ensure they scroll */
        .menu-section {
          max-height: 70vh;
          overflow-y: auto;
          padding-right: 10px; /* Add padding to prevent content from being hidden behind scrollbar */
        }
      `}</style>
    </div>
  );
};

export default Menu;
