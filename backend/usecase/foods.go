package usecase

import (
	"github.com/hp/Desktop/full-stack-food-app/model"
	"github.com/hp/Desktop/full-stack-food-app/repositories"
)

type FoodUsecase interface {
	GetAllFoods() ([]model.Food, error)
	AddFood(food model.Food) (model.Food, error)
	UpdateFood(id string, food model.Food) (model.Food, error)
	DeleteFood(id string) error
	SearchFoodByName(name string) ([]model.Food, error)
}


type foodUsecase struct {
	foodRepo repositories.FoodRepository
}

func NewFoodUsecase(foodRepo repositories.FoodRepository) FoodUsecase {
	return &foodUsecase{
		foodRepo: foodRepo,
	}
}


func (f *foodUsecase) GetAllFoods() ([]model.Food, error) {
	foods, err := f.foodRepo.GetAllFoods()
	if err != nil {
		return nil, err
	}
	return foods, nil
}

func (f *foodUsecase) AddFood(food model.Food) (model.Food, error) {
	return f.foodRepo.AddFood(food)
}

func (f *foodUsecase) UpdateFood(id string, food model.Food) (model.Food, error) {
	return f.foodRepo.UpdateFood(id, food)
}

func (f *foodUsecase) DeleteFood(id string) error {
	return f.foodRepo.DeleteFood(id)
}
func (f *foodUsecase) SearchFoodByName(name string) ([]model.Food, error) {
	foods, err := f.foodRepo.SearchFoodByName(name)
	if err != nil {
		return nil, err
	}
	return foods, nil
}