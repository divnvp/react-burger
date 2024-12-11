import {
  ingredientDetailsReducer,
  initialStateOfIngredientDetails
} from './ingredient-details';
import {
  getIngredientDetails,
  TIngredientDetailsActions
} from '../actions/ingredient-details';
import { Ingredient } from '../../shared/models/ingredient.type';
import { v4 } from 'uuid';

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

describe('Ingredient details reducer', () => {
  it('should return initial state', () => {
    expect(
      ingredientDetailsReducer(
        initialStateOfIngredientDetails,
        {} as TIngredientDetailsActions
      )
    ).toEqual(initialStateOfIngredientDetails);
  });

  it('should get ingredient details', () => {
    expect(
      ingredientDetailsReducer(
        initialStateOfIngredientDetails,
        getIngredientDetails(testIngredient)
      )
    ).toEqual({
      ...initialStateOfIngredientDetails
    });
  });
});
