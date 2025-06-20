package controller

// ...existing imports...
import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/hp/Desktop/full-stack-food-app/infrastructure"
	"github.com/hp/Desktop/full-stack-food-app/model"
	"github.com/hp/Desktop/full-stack-food-app/usecase"
)


type FoodController struct {
    FoodUsecase usecase.FoodUsecase
}

func NewFoodController(foodUsecase usecase.FoodUsecase) *FoodController {
    return &FoodController{FoodUsecase: foodUsecase}
}

func (fc *FoodController) GetAllFoods(c *gin.Context) {
    foods, err := fc.FoodUsecase.GetAllFoods()
    if err != nil {
        c.JSON(http.StatusInternalServerError, infrastructure.ErrorResponse{Code: http.StatusInternalServerError, Message: err.Error()})
        return
    }
    c.JSON(http.StatusOK, foods)
}

func (fc *FoodController) AddFood(c *gin.Context) {
    var food model.Food
    if err := c.ShouldBindJSON(&food); err != nil {
        c.JSON(http.StatusBadRequest, infrastructure.ErrorResponse{Code: http.StatusBadRequest, Message: "Invalid JSON: " + err.Error()})
        return
    }
    if ok, msg := infrastructure.ValidateFood(&food); !ok {
        c.JSON(http.StatusBadRequest, infrastructure.ErrorResponse{Code: http.StatusBadRequest, Message: msg})
        return
    }
    createdFood, err := fc.FoodUsecase.AddFood(food)
    if err != nil {
        c.JSON(http.StatusInternalServerError, infrastructure.ErrorResponse{Code: http.StatusInternalServerError, Message: err.Error()})
        return
    }
    c.JSON(http.StatusCreated, createdFood)
}

func (fc *FoodController) UpdateFood(c *gin.Context) {
    id := c.Param("id")
    var food model.Food
    if err := c.ShouldBindJSON(&food); err != nil {
        c.JSON(http.StatusBadRequest, infrastructure.ErrorResponse{Code: http.StatusBadRequest, Message: "Invalid JSON: " + err.Error()})
        return
    }
    if ok, msg := infrastructure.ValidateFood(&food); !ok {
        c.JSON(http.StatusBadRequest, infrastructure.ErrorResponse{Code: http.StatusBadRequest, Message: msg})
        return
    }
    updatedFood, err := fc.FoodUsecase.UpdateFood(id, food)
    if err != nil {
        c.JSON(http.StatusNotFound, infrastructure.ErrorResponse{Code: http.StatusNotFound, Message: err.Error()})
        return
    }
    c.JSON(http.StatusOK, updatedFood)
}

func (fc *FoodController) DeleteFood(c *gin.Context) {
    id := c.Param("id")
    if err := fc.FoodUsecase.DeleteFood(id); err != nil {
        c.JSON(http.StatusNotFound, infrastructure.ErrorResponse{Code: http.StatusNotFound, Message: err.Error()})
        return
    }
    c.JSON(http.StatusOK, gin.H{"message": "Food deleted"})
}

func (fc *FoodController) SearchFoodByName(c *gin.Context) {
    name := c.Query("name")
    foods, err := fc.FoodUsecase.SearchFoodByName(name)
    if err != nil {
        c.JSON(http.StatusInternalServerError, infrastructure.ErrorResponse{Code: http.StatusInternalServerError, Message: err.Error()})
        return
    }
    c.JSON(http.StatusOK, foods)
}