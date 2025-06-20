'use client';

import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

interface HeaderProps {
  onAddMeal: () => void;
}

export function Header({ onAddMeal }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="h-8 w-8 text-orange-500" />
            <span className="text-xl font-bold text-gray-900">FoodWagen</span>
          </div>
          <Button 
            onClick={onAddMeal}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full"
          >
            Add Meal
          </Button>
        </div>
      </div>
    </header>
  );
}