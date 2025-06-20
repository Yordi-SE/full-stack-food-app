import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Meal {
  id: string;
  food_name: string;
  food_rating: number;
  food_image: string;
  restaurant_name: string;
  restaurant_logo: string;
  restaurant_status: 'Open Now' | 'Closed';
  price: number;
}

interface MealsState {
  meals: Meal[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
}

const initialState: MealsState = {
  meals: [
    {
      id: '1',
      food_name: 'Bow Lasagna',
      food_rating: 4.9,
      food_image: 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      restaurant_name: 'Subway',
      restaurant_logo: '',
      restaurant_status: 'Closed',
      price: 2.99
    },
    {
      id: '2',
      food_name: 'Mixed Avocado Smoothie',
      food_rating: 4.9,
      food_image: 'https://images.pexels.com/photos/1192031/pexels-photo-1192031.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      restaurant_name: 'Subway',
      restaurant_logo: '',
      restaurant_status: 'Closed',
      price: 5.99
    },
    {
      id: '3',
      food_name: 'Pancake',
      food_rating: 5,
      food_image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      restaurant_name: 'Dominos',
      restaurant_logo: '',
      restaurant_status: 'Open Now',
      price: 3.99
    },
    {
      id: '4',
      food_name: 'Cupcake',
      food_rating: 4,
      food_image: 'https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      restaurant_name: 'Subway',
      restaurant_logo: '',
      restaurant_status: 'Open Now',
      price: 1.99
    },
    {
      id: '5',
      food_name: 'Creamy Stake',
      food_rating: 4.5,
      food_image: 'https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      restaurant_name: 'Subway',
      restaurant_logo: '',
      restaurant_status: 'Open Now',
      price: 12.99
    },
    {
      id: '6',
      food_name: 'Stake with Potatos',
      food_rating: 5,
      food_image: 'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      restaurant_name: 'KFC',
      restaurant_logo: '',
      restaurant_status: 'Open Now',
      price: 15.99
    },
    {
      id: '7',
      food_name: 'Indian Spicy Soup',
      food_rating: 4.5,
      food_image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      restaurant_name: 'Dominos',
      restaurant_logo: '',
      restaurant_status: 'Open Now',
      price: 9.99
    },
    {
      id: '8',
      food_name: 'Stake Omlet',
      food_rating: 4.9,
      food_image: 'https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      restaurant_name: 'Subway',
      restaurant_logo: '',
      restaurant_status: 'Open Now',
      price: 11.99
    }
  ],
  loading: false,
  error: null,
  searchTerm: ''
};

const mealsSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setMeals: (state, action: PayloadAction<Meal[]>) => {
      state.meals = action.payload;
    },
    addMeal: (state, action: PayloadAction<Meal>) => {
      state.meals.unshift(action.payload);
    },
    updateMeal: (state, action: PayloadAction<Meal>) => {
      const index = state.meals.findIndex(meal => meal.id === action.payload.id);
      if (index !== -1) {
        state.meals[index] = action.payload;
      }
    },
    deleteMeal: (state, action: PayloadAction<string>) => {
      state.meals = state.meals.filter(meal => meal.id !== action.payload);
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    }
  }
});

export const {
  setLoading,
  setError,
  setMeals,
  addMeal,
  updateMeal,
  deleteMeal,
  setSearchTerm
} = mealsSlice.actions;

export default mealsSlice.reducer;