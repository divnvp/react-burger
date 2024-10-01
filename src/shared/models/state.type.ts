import { Ingredient } from './ingredient.type';

export type State = {
  burgerConstructor: Partial<Ingredient[]>;
  ingredients: Ingredient[];
  ingredient: Ingredient;
  amount: number;
};
