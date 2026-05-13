import { createContext, useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('fragra_cart');
      if (stored) setCartItems(JSON.parse(stored));
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    }
  }, []);

  // Save to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('fragra_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    toast.success(`${product.name} added to cart`, {
      style: {
        background: '#1A1A1A',
        color: '#ffffff',
        borderRadius: '100px',
        fontSize: '11px',
        letterSpacing: '0.05em',
        padding: '10px 20px',
        fontFamily: "'Inter', sans-serif",
      },
      iconTheme: { primary: '#C9A96E', secondary: '#1A1A1A' },
      duration: 2500,
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    localStorage.removeItem('fragra_cart');
  }, []);

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
