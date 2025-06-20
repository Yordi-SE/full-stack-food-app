package repositories

import (
	"errors"
	"strings"

	"github.com/hp/Desktop/full-stack-food-app/config"
	"github.com/hp/Desktop/full-stack-food-app/model"
)

type FoodRepository interface {
    GetAllFoods() ([]model.Food, error)
    AddFood(food model.Food) (model.Food, error)
    UpdateFood(id string, food model.Food) (model.Food, error)
    DeleteFood(id string) error
    SearchFoodByName(name string) ([]model.Food, error)
}

type foodRepository struct{}

func NewFoodRepository() FoodRepository {
    return &foodRepository{}
}

func (f *foodRepository) GetAllFoods() ([]model.Food, error) {
    return config.FoodStore, nil
}

func (f *foodRepository) AddFood(food model.Food) (model.Food, error) {
    config.FoodStore = append(config.FoodStore, food)
    return food, nil
}

func (f *foodRepository) UpdateFood(id string, food model.Food) (model.Food, error) {
    for i, v := range config.FoodStore {
        if v.ID == id {
            config.FoodStore[i] = food
            return food, nil
        }
    }
    return model.Food{}, errors.New("food not found")
}

func (f *foodRepository) DeleteFood(id string) error {
    for i, v := range config.FoodStore {
        if v.ID == id {
            config.FoodStore = append(config.FoodStore[:i], config.FoodStore[i+1:]...)
            return nil
        }
    }
    return errors.New("food not found")
}

func (f *foodRepository) SearchFoodByName(name string) ([]model.Food, error) {
    var result []model.Food
    for _, v := range config.FoodStore {
        if strings.Contains(strings.ToLower(v.FoodName), strings.ToLower(name)) {
            result = append(result, v)
        }
    }
    return result, nil
}