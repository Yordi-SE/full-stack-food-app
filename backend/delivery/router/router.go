package router

import (
	"github.com/gin-gonic/gin"
	"github.com/hp/Desktop/full-stack-food-app/delivery/controller"
)

func SetupRouter(foodController *controller.FoodController) *gin.Engine {
    r := gin.Default()

	r.GET("/foods", foodController.GetAllFoods)
	r.POST("/foods", foodController.AddFood)
	r.PUT("/foods/:id", foodController.UpdateFood)
	r.DELETE("/foods/:id", foodController.DeleteFood)
	r.GET("/foods/search", foodController.SearchFoodByName)

	return r
}

  