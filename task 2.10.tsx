import React from 'react';
import { X, Star, ShoppingCart, Plus, Minus } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToCart, items, updateQuantity } = useCart();
  const [quantity, setQuantity] = React.useState(1);

  if (!product) return null;

  const cartItem = items.find(item => item.product.id === product.id);
  const currentQuantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setQuantity(1);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Product Image */}
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 md:h-80 object-cover rounded-lg"
                />
                <div className="absolute top-2 left-2">
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
                
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                <p className="text-gray-600 leading-relaxed">{product.description}</p>

                <div className="text-3xl font-bold text-gray-900">
                  ₹{product.price.toLocaleString('en-IN')}
                </div>

                {product.inStock ? (
                  <div className="space-y-4">
                    {currentQuantity > 0 && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <p className="text-green-800 text-sm">
                          {currentQuantity} item(s) in cart
                        </p>
                      </div>
                    )}

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="p-2 hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <button
                        onClick={handleAddToCart}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                      >
                        <ShoppingCart className="h-5 w-5" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800 font-medium">Out of Stock</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}