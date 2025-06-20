'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Meal } from '@/lib/features/meals/mealsSlice';

interface MealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (meal: Omit<Meal, 'id'>) => void;
  meal?: Meal | null;
  mode: 'add' | 'edit';
}

export function MealModal({ isOpen, onClose, onSubmit, meal, mode }: MealModalProps) {
  const [formData, setFormData] = useState({
    food_name: '',
    food_rating: '',
    food_image: '',
    restaurant_name: '',
    restaurant_logo: '',
    restaurant_status: 'Open Now' as 'Open Now' | 'Closed',
    price: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (meal && mode === 'edit') {
      setFormData({
        food_name: meal.food_name,
        food_rating: meal.food_rating.toString(),
        food_image: meal.food_image,
        restaurant_name: meal.restaurant_name,
        restaurant_logo: meal.restaurant_logo,
        restaurant_status: meal.restaurant_status,
        price: meal.price.toString()
      });
    } else {
      setFormData({
        food_name: '',
        food_rating: '',
        food_image: '',
        restaurant_name: '',
        restaurant_logo: '',
        restaurant_status: 'Open Now',
        price: ''
      });
    }
    setErrors({});
  }, [meal, mode, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.food_name.trim()) {
      newErrors.food_name = 'Food name is required';
    }

    if (!formData.food_rating) {
      newErrors.food_rating = 'Food rating is required';
    } else {
      const rating = parseFloat(formData.food_rating);
      if (isNaN(rating) || rating < 0 || rating > 5) {
        newErrors.food_rating = 'Rating must be between 0 and 5';
      }
    }

    if (!formData.food_image.trim()) {
      newErrors.food_image = 'Food image URL is required';
    }

    if (!formData.restaurant_name.trim()) {
      newErrors.restaurant_name = 'Restaurant name is required';
    }

    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else {
      const price = parseFloat(formData.price);
      if (isNaN(price) || price < 0) {
        newErrors.price = 'Price must be a positive number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const mealData: Omit<Meal, 'id'> = {
      food_name: formData.food_name.trim(),
      food_rating: parseFloat(formData.food_rating),
      food_image: formData.food_image.trim(),
      restaurant_name: formData.restaurant_name.trim(),
      restaurant_logo: formData.restaurant_logo.trim(),
      restaurant_status: formData.restaurant_status,
      price: parseFloat(formData.price)
    };

    onSubmit(mealData);
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-orange-500 text-xl font-semibold">
            {mode === 'add' ? 'Add a meal' : 'Edit Meal'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="food_name">Food name</Label>
            <Input
              id="food_name"
              name="food_name"
              placeholder="Food name"
              value={formData.food_name}
              onChange={(e) => handleChange('food_name', e.target.value)}
              className={errors.food_name ? 'border-red-500' : ''}
            />
            {errors.food_name && (
              <p className="text-sm text-red-500 mt-1">{errors.food_name}</p>
            )}
            {!formData.food_name && (
              <p className="text-sm text-red-500 mt-1">Food name is required</p>
            )}
          </div>

          <div>
            <Label htmlFor="food_rating">Food rating</Label>
            <Input
              id="food_rating"
              name="food_rating"
              type="number"
              min="0"
              max="5"
              step="0.1"
              placeholder="Food rating (0-5)"
              value={formData.food_rating}
              onChange={(e) => handleChange('food_rating', e.target.value)}
              className={errors.food_rating ? 'border-red-500' : ''}
            />
            {errors.food_rating && (
              <p className="text-sm text-red-500 mt-1">{errors.food_rating}</p>
            )}
          </div>

          <div>
            <Label htmlFor="food_image">Food image (link)</Label>
            <Input
              id="food_image"
              name="food_image"
              placeholder="Food image URL"
              value={formData.food_image}
              onChange={(e) => handleChange('food_image', e.target.value)}
              className={errors.food_image ? 'border-red-500' : ''}
            />
            {errors.food_image && (
              <p className="text-sm text-red-500 mt-1">{errors.food_image}</p>
            )}
          </div>

          <div>
            <Label htmlFor="restaurant_name">Restaurant name</Label>
            <Input
              id="restaurant_name"
              name="restaurant_name"
              placeholder="Restaurant name"
              value={formData.restaurant_name}
              onChange={(e) => handleChange('restaurant_name', e.target.value)}
              className={errors.restaurant_name ? 'border-red-500' : ''}
            />
            {errors.restaurant_name && (
              <p className="text-sm text-red-500 mt-1">{errors.restaurant_name}</p>
            )}
          </div>

          <div>
            <Label htmlFor="restaurant_logo">Restaurant logo (link)</Label>
            <Input
              id="restaurant_logo"
              name="restaurant_logo"
              placeholder="Restaurant logo URL"
              value={formData.restaurant_logo}
              onChange={(e) => handleChange('restaurant_logo', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              placeholder="Price"
              value={formData.price}
              onChange={(e) => handleChange('price', e.target.value)}
              className={errors.price ? 'border-red-500' : ''}
            />
            {errors.price && (
              <p className="text-sm text-red-500 mt-1">{errors.price}</p>
            )}
          </div>

          <div>
            <Label htmlFor="restaurant_status">Restaurant status (open/close)</Label>
            <Select
              name="restaurant_status"
              value={formData.restaurant_status}
              onValueChange={(value: 'Open Now' | 'Closed') => handleChange('restaurant_status', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Open Now">Open Now</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
            >
              {mode === 'add' ? 'Add' : 'Save'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}