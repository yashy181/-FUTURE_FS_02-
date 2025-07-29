import React from 'react';
import { categories } from '../data/products';

interface ProductFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export function ProductFilter({ 
  selectedCategory, 
  onCategoryChange, 
  sortBy, 
  onSortChange 
}: ProductFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      {/* Category Filter */}
      <div className="flex-1">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Sort Filter */}
      <div className="flex-1">
        <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
          Sort By
        </label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="name">Name (A-Z)</option>
          <option value="price-low">Price (Low to High)</option>
          <option value="price-high">Price (High to Low)</option>
          <option value="rating">Rating</option>
        </select>
      </div>
    </div>
  );
}