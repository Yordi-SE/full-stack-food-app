'use client';

import { Star, MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Meal } from '@/lib/features/meals/mealsSlice';

interface MealCardProps {
  meal: Meal;
  onEdit: (meal: Meal) => void;
  onDelete: (meal: Meal) => void;
}

export function MealCard({ meal, onEdit, onDelete }: MealCardProps) {
  const getRestaurantColor = (name: string) => {
    const colors = {
      'Subway': 'bg-blue-100 text-blue-800',
      'KFC': 'bg-red-100 text-red-800',
      'Dominos': 'bg-blue-100 text-blue-800',
    };
    return colors[name as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getRestaurantLogo = (name: string) => {
    // Using simple colored squares as logos for demo
    const logos = {
      'Subway': '🟦',
      'KFC': '🟩', 
      'Dominos': '🟦',
    };
    return logos[name as keyof typeof logos] || '🍽️';
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative">
        <img
          src={meal.food_image}
          alt={meal.food_name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-orange-500 text-white font-semibold">
            ${meal.price.toFixed(2)}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="bg-white/80 hover:bg-white p-1 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(meal)}>
                Edit Meal
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete(meal)}
                className="text-red-600 focus:text-red-600"
              >
                Delete Meal
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-lg">{getRestaurantLogo(meal.restaurant_name)}</span>
          <span className="restaurant-name font-medium text-sm text-gray-600">
            {meal.restaurant_name}
          </span>
        </div>
        
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{meal.food_name}</h3>
        
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="restaurant-rating text-sm font-medium">{meal.food_rating}</span>
          </div>
        </div>
        
        <div className="restaurant-status">
          <Badge 
            variant={meal.restaurant_status === 'Open Now' ? 'default' : 'secondary'}
            className={
              meal.restaurant_status === 'Open Now' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }
          >
            {meal.restaurant_status}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}