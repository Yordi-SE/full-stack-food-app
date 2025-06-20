// validateFood checks required fields for a Food struct
package infrastructure

import (
	"strings"

	"github.com/hp/Desktop/full-stack-food-app/model"
)

func ValidateFood(food *model.Food) (bool, string) {
    if strings.TrimSpace(food.FoodName) == "" {
        return false, "food_name is required"
    }
    if strings.TrimSpace(food.RestaurantName) == "" {
        return false, "restaurant_name is required"
    }
    if strings.TrimSpace(food.RestaurantStatus) == "" {
        return false, "restaurant_status is required"
    }
    if food.FoodRating < 0 || food.FoodRating > 5 {
        return false, "food_rating must be between 0 and 5"
    }
    return true, ""
}