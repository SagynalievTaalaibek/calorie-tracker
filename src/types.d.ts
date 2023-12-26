export interface MealFormInterface {
  meal: string;
  description: string;
  calorie: number;
}

export interface MealsList {
  [id: string]: MealFormInterface;
}

export interface Meals {
  id: string;
  meal: string;
  description: string;
  calorie: number;
}
