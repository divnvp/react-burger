import { v4 } from 'uuid';
import { Ingredient } from '../../shared/models/ingredient.type';
import {
  burgerIngredientsReducer,
  initialStateOfBurgerIngredients
} from './burger-ingredients';
import {
  getErrorOfIngredients,
  getIngredients,
  makeRequestOfIngredients,
  TBurgerIngredientsActions
} from '../actions/burger-ingredients';

const _id = v4();

const testIngredient: Ingredient = {
  _id,
  name: 'string;',
  type: 'string;',
  proteins: 1,
  fat: 1,
  carbohydrates: 1,
  calories: 1,
  price: 1,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  __v: 0
};

describe('Burger ingredients reducer', () => {
  it('should return the initial state', () => {
    expect(
      burgerIngredientsReducer(
        initialStateOfBurgerIngredients,
        {} as TBurgerIngredientsActions
      )
    ).toEqual(initialStateOfBurgerIngredients);
  });

  it('should get ingredients', () => {
    expect(
      burgerIngredientsReducer(
        initialStateOfBurgerIngredients,
        getIngredients([testIngredient])
      )
    ).toEqual({
      ...initialStateOfBurgerIngredients,
      ingredients: [testIngredient]
    });
  });

  it('should catch ingredients error', () => {
    expect(
      burgerIngredientsReducer(
        initialStateOfBurgerIngredients,
        getErrorOfIngredients({ error: 'lalala' })
      )
    ).toEqual({
      ...initialStateOfBurgerIngredients,
      error: {
        error: 'lalala'
      }
    });
  });

  it('should request ingredients', () => {
    expect(
      burgerIngredientsReducer(
        initialStateOfBurgerIngredients,
        makeRequestOfIngredients()
      )
    ).toEqual({
      ...initialStateOfBurgerIngredients
    });
  });
});
