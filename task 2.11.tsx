import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartContextType, CartItem, Product } from '../types';

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartAction =
  | { type: 'ADD_TO_CART'; product: Product }
  | { type: 'REMOVE_FROM_CART'; productId: number }
  | { type: 'UPDATE_QUANTITY'; productId: number; quantity: number }
  | { type: 'CLEAR_CART' };

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.find(item => item.product.id === action.product.id);
      if (existingItem) {
        return state.map(item =>
          item.product.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { product: action.product, quantity: 1 }];
    }
    case 'REMOVE_FROM_CART':
      return state.filter(item => item.product.id !== action.productId);
    case 'UPDATE_QUANTITY':
      if (action.quantity <= 0) {
        return state.filter(item => item.product.id !== action.productId);
      }
      return state.map(item =>
        item.product.id === action.productId
          ? { ...item, quantity: action.quantity }
          : item
      );
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, []);

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', product });
  };

  const removeFromCart = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', productId });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalItems,
    getTotalPrice,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}