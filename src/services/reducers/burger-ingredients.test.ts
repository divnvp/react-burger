import { burgerConstructorReducer } from './burger-constructor';
import { TBurgerConstructorActions } from '../actions/burger-constructor';
import { BUN_ADDING } from '../constants';
import { v4 } from 'uuid';

describe('Burger ingredients reducer', () => {
  it('should return the initial state', () => {
    expect(
      burgerConstructorReducer(undefined, {} as TBurgerConstructorActions)
    ).toEqual({
      burgerConstructor: [],
      amount: 0,
      error: null,
      loading: false
    });
  });

  it('should add bun to constructor', () => {
    const _id = v4();
    expect(
      burgerConstructorReducer(undefined, {
        type: BUN_ADDING,
        bun: {
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
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          __v: 0
        }
      })
    ).toEqual({
      amount: 0,
      burgerConstructor: [],
      error: null,
      loading: false,
      buns: {
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
      }
    });
  });
});
