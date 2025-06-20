'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useAppDispatch } from '@/lib/hooks';
import { setSearchTerm } from '@/lib/features/meals/mealsSlice';

export function HeroSection() {
  const [localSearch, setLocalSearch] = useState('');
  const dispatch = useAppDispatch();

  const handleSearch = () => {
    dispatch(setSearchTerm(localSearch));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className="bg-gradient-to-r from-orange-400 to-yellow-400 py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Are you starving?
        </h1>
        <p className="text-xl text-white/90 mb-8">
          Within a few clicks, find meals that are accessible near you
        </p>
        
        <div className="bg-white rounded-lg p-6 max-w-2xl mx-auto shadow-lg">
          <div className="flex space-x-4 mb-4">
            <button className="flex items-center space-x-2 text-orange-500 border-b-2 border-orange-500 pb-2">
              <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
              <span>Delivery</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-500 pb-2">
              <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
              <span>Pickup</span>
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="What do you like to eat today?"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="pl-10 py-3 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
            <Button 
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3"
            >
              Find Meal
            </Button>
          </form>
        </div>
        
        <div className="mt-12 relative">
          <img 
            src="https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1"
            alt="Delicious Food"
            className="w-64 h-64 object-cover rounded-full mx-auto shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
}