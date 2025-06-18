import React from 'react';
import { Search, Filter, X } from 'lucide-react';

interface EventFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
}

const EventFilters: React.FC<EventFiltersProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  priceRange,
  onPriceRangeChange
}) => {
  const [showFilters, setShowFilters] = React.useState(false);

  const clearFilters = () => {
    onSearchChange('');
    onCategoryChange('');
    onPriceRangeChange([0, 1000]);
  };

  const hasActiveFilters = searchTerm || selectedCategory || priceRange[0] > 0 || priceRange[1] < 1000;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-gray-100">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:text-blue-600 hover:border-blue-300 transition-colors"
          >
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </button>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center px-4 py-3 text-red-600 hover:text-red-800 transition-colors"
            >
              <X className="h-5 w-5 mr-2" />
              Clear
            </button>
          )}
        </div>
      </div>

      {showFilters && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-600">Min Price</label>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    step="25"
                    value={priceRange[0]}
                    onChange={(e) => onPriceRangeChange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600">Max Price</label>
                  <input
                    type="range"
                    min="100"
                    max="1000"
                    step="25"
                    value={priceRange[1]}
                    onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventFilters;