const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data store (replace with database in production)
let foods = [
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
  }
];

// Validation middleware
const validateFood = (req, res, next) => {
  const { food_name, food_rating, food_image, restaurant_name, restaurant_status, price } = req.body;
  
  const errors = [];
  
  if (!food_name || typeof food_name !== 'string' || food_name.trim().length === 0) {
    errors.push('Food name is required and must be a non-empty string');
  }
  
  if (food_rating === undefined || food_rating === null || isNaN(food_rating) || food_rating < 0 || food_rating > 5) {
    errors.push('Food rating is required and must be a number between 0 and 5');
  }
  
  if (!food_image || typeof food_image !== 'string' || food_image.trim().length === 0) {
    errors.push('Food image URL is required and must be a non-empty string');
  }
  
  if (!restaurant_name || typeof restaurant_name !== 'string' || restaurant_name.trim().length === 0) {
    errors.push('Restaurant name is required and must be a non-empty string');
  }
  
  if (!restaurant_status || !['Open Now', 'Closed'].includes(restaurant_status)) {
    errors.push('Restaurant status must be either "Open Now" or "Closed"');
  }
  
  if (price === undefined || price === null || isNaN(price) || price < 0) {
    errors.push('Price is required and must be a positive number');
  }
  
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors
    });
  }
  
  next();
};

// Routes

// GET /api/foods - Get all food items or search by name
app.get('/api/foods', (req, res) => {
  try {
    const { name } = req.query;
    
    let result = foods;
    
    if (name) {
      const searchTerm = name.toLowerCase();
      result = foods.filter(food => 
        food.food_name.toLowerCase().includes(searchTerm) ||
        food.restaurant_name.toLowerCase().includes(searchTerm)
      );
    }
    
    res.json({
      success: true,
      data: result,
      total: result.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// GET /api/foods/:id - Get a specific food item
app.get('/api/foods/:id', (req, res) => {
  try {
    const { id } = req.params;
    const food = foods.find(f => f.id === id);
    
    if (!food) {
      return res.status(404).json({
        success: false,
        message: 'Food item not found'
      });
    }
    
    res.json({
      success: true,
      data: food
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// POST /api/foods - Create a new food item
app.post('/api/foods', validateFood, (req, res) => {
  try {
    const newFood = {
      id: uuidv4(),
      ...req.body,
      food_rating: parseFloat(req.body.food_rating),
      price: parseFloat(req.body.price)
    };
    
    foods.unshift(newFood);
    
    res.status(201).json({
      success: true,
      message: 'Food item created successfully',
      data: newFood
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// PUT /api/foods/:id - Update a food item
app.put('/api/foods/:id', validateFood, (req, res) => {
  try {
    const { id } = req.params;
    const foodIndex = foods.findIndex(f => f.id === id);
    
    if (foodIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Food item not found'
      });
    }
    
    const updatedFood = {
      id,
      ...req.body,
      food_rating: parseFloat(req.body.food_rating),
      price: parseFloat(req.body.price)
    };
    
    foods[foodIndex] = updatedFood;
    
    res.json({
      success: true,
      message: 'Food item updated successfully',
      data: updatedFood
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// DELETE /api/foods/:id - Delete a food item
app.delete('/api/foods/:id', (req, res) => {
  try {
    const { id } = req.params;
    const foodIndex = foods.findIndex(f => f.id === id);
    
    if (foodIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Food item not found'
      });
    }
    
    const deletedFood = foods.splice(foodIndex, 1)[0];
    
    res.json({
      success: true,
      message: 'Food item deleted successfully',
      data: deletedFood
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'FoodWagen API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`🚀 FoodWagen API server running on http://localhost:${PORT}`);
  console.log(`📚 API endpoints:`);
  console.log(`   GET    /api/foods`);
  console.log(`   GET    /api/foods?name=search`);
  console.log(`   POST   /api/foods`);
  console.log(`   PUT    /api/foods/:id`);
  console.log(`   DELETE /api/foods/:id`);
  console.log(`   GET    /health`);
});

module.exports = app;