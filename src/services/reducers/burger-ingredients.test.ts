import { v4 } from 'uuid';
import { Ingredient } from '../../shared/models/ingredient.type';
import { burgerIngredientsReducer } from './burger-ingredients';
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
const initialState = {
  ingredients: [],
  error: null
};

describe('Burger ingredients reducer', () => {
  it('should return the initial state', () => {
    expect(
      burgerIngredientsReducer(initialState, {} as TBurgerIngredientsActions)
    ).toEqual(initialState);
  });

  it('should get ingredients', () => {
    expect(
      burgerIngredientsReducer(initialState, getIngredients([testIngredient]))
    ).toEqual({
      ...initialState,
      ingredients: [testIngredient]
    });
  });

  it('should catch ingredients error', () => {
    expect(
      burgerIngredientsReducer(
        initialState,
        getErrorOfIngredients({ error: 'lalala' })
      )
    ).toEqual({
      ...initialState,
      error: {
        error: 'lalala'
      }
    });
  });

  it('should request ingredients', () => {
    expect(
      burgerIngredientsReducer(initialState, makeRequestOfIngredients())
    ).toEqual({
      ...initialState
    });
  });
});
