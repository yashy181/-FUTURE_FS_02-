import React from 'react';
import { ShoppingBag, Truck, Shield, HeadphonesIcon } from 'lucide-react';

export function Hero() {
  return (
    <div id="hero" className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to AK E-commerce
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Discover amazing products at unbeatable prices
          </p>
          <a href="#products" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Shop Now
          </a>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Truck className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Free Shipping</h3>
            <p className="text-blue-100">Free shipping on orders over $50</p>
            <p className="text-blue-100">Free shipping on orders over ₹4,000</p>
          </div>
          <div className="text-center">
            <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Secure Payment</h3>
            <p className="text-blue-100">Your payment information is safe</p>
          </div>
          <div className="text-center">
            <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <HeadphonesIcon className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
            <p className="text-blue-100">Get help when you need it</p>
          </div>
        </div>
      </div>
    </div>
  );
}