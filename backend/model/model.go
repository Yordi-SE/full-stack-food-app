package model

// Food represents a food item in the application. restaurant_logo,restaurant_status = “Open Now” or “Closed”, "food_name",food_rating,food_image,restaurant_name
type Food struct {
	ID              string  `bson:"_id,omitempty"`
	RestaurantLogo  string  `bson:"restaurant_logo"`
	RestaurantStatus string  `bson:"restaurant_status"`
	FoodName        string  `bson:"food_name"`
	FoodRating      float64 `bson:"food_rating"`
	FoodImage      string  `bson:"food_image"`
	RestaurantName  string  `bson:"restaurant_name"`
}

