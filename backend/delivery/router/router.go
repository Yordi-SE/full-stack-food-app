package router

import (
	"github.com/gin-gonic/gin"
	"github.com/hp/Desktop/full-stack-food-app/delivery/controller"
)

func SetupRouter(foodController *controller.FoodController) *gin.Engine {
    r := gin.Default()
	api := r.Group("/api")
	api.GET("/foods", foodController.GetAllFoods)
	api.POST("/foods", foodController.AddFood)
	api.PUT("/foods/:id", foodController.UpdateFood)
	api.DELETE("/foods/:id", foodController.DeleteFood)
	api.GET("/foods/search", foodController.SearchFoodByName)

	return r
}

  