package main

import (
	"github.com/hp/Desktop/full-stack-food-app/delivery/controller"
	"github.com/hp/Desktop/full-stack-food-app/delivery/router"
	"github.com/hp/Desktop/full-stack-food-app/repositories"
	"github.com/hp/Desktop/full-stack-food-app/usecase"
)

func main() {
    foodRepo := repositories.NewFoodRepository()
    foodUsecase := usecase.NewFoodUsecase(foodRepo)
    foodController := controller.NewFoodController(foodUsecase)

    r := router.SetupRouter(foodController)
    r.Run(":8080")
}