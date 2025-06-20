'use client';

import { useState, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '../lib/hooks';
import { addMeal, updateMeal, deleteMeal } from '../lib/features/meals/mealsSlice';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { MealCard } from '../components/MealCard';
import { MealModal } from '../components/MealModal';
import { DeleteModal } from '../components/DeleteModal';
import { Footer } from '../components/Footer';
import { EmptyState } from '../components/EmptyState';
import { Button } from '../components/ui/button';
// Update the import path below if the actual file location is different
import type { Meal } from '../lib/features/meals/mealsSlice';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const dispatch = useAppDispatch();
  const { meals, searchTerm } = useAppSelector((state) => state.meals);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [showAll, setShowAll] = useState(false);

  const filteredMeals = useMemo(() => {
    if (!searchTerm) return meals;
    return meals.filter(meal => 
      meal.food_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meal.restaurant_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [meals, searchTerm]);

  const displayedMeals = showAll ? filteredMeals : filteredMeals.slice(0, 8);

  const handleAddMeal = (mealData: Omit<Meal, 'id'>) => {
    const newMeal: Meal = {
      ...mealData,
      id: uuidv4(),
    };
    dispatch(addMeal(newMeal));
  };

  const handleEditMeal = (mealData: Omit<Meal, 'id'>) => {
    if (selectedMeal) {
      const updatedMeal: Meal = {
        ...mealData,
        id: selectedMeal.id,
      };
      dispatch(updateMeal(updatedMeal));
    }
  };

  const handleDeleteMeal = () => {
    if (selectedMeal) {
      dispatch(deleteMeal(selectedMeal.id));
      setIsDeleteModalOpen(false);
      setSelectedMeal(null);
    }
  };

  const openEditModal = (meal: Meal) => {
    setSelectedMeal(meal);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (meal: Meal) => {
    setSelectedMeal(meal);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAddMeal={() => setIsAddModalOpen(true)} />
      <HeroSection />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {searchTerm ? 'Search Results' : 'Featured Meals'}
          </h2>
          {searchTerm && (
            <p className="text-gray-600">
              Found {filteredMeals.length} meals matching "{searchTerm}"
            </p>
          )}
        </div>

        {filteredMeals.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {displayedMeals.map((meal) => (
                <MealCard
                  key={meal.id}
                  meal={meal}
                  onEdit={openEditModal}
                  onDelete={openDeleteModal}
                />
              ))}
            </div>

            {filteredMeals.length > 8 && (
              <div className="text-center">
                <Button
                  onClick={() => setShowAll(!showAll)}
                  variant="outline"
                  className="px-8 py-3 border-orange-500 text-orange-500 hover:bg-orange-50"
                >
                  {showAll ? 'Show Less' : `Load more (${filteredMeals.length - 8} more)`}
                </Button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />

      <MealModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddMeal}
        mode="add"
      />

      <MealModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedMeal(null);
        }}
        onSubmit={handleEditMeal}
        meal={selectedMeal}
        mode="edit"
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedMeal(null);
        }}
        onConfirm={handleDeleteMeal}
        meal={selectedMeal}
      />
    </div>
  );
}