export interface MealFormInterface {
  meal: string;
  description: string;
  calorie: number;
}

export interface ApiMeals {
  meal: string;
  description: string;
  calorie: string;
}

export interface MealsList {
  [id: string]: ApiMeals;
}

export interface Meals {
  id: string;
  meal: string;
  description: string;
  calorie: number;
}
