import { burgerConstructorReducer } from './burger-constructor';
import {
  addBun,
  addIngredient,
  clearOrderAction,
  getError,
  getOfBurgerConstructorAction,
  getOrder,
  makeRequest,
  moveIngredientAction,
  recalculateAmountAction,
  removeIngredientAction,
  TBurgerConstructorActions
} from '../actions/burger-constructor';
import { v4 } from 'uuid';
import { Ingredient } from '../../shared/models/ingredient.type';
import { Order } from '../../shared/models/order.type';

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
const testOrder: Order = { name: 'name', order: { number: 1 }, success: true };
const initialState = {
  burgerConstructor: [],
  amount: 0,
  error: null,
  loading: false
};

describe('Constructor reducer', () => {
  it('should return the initial state', () => {
    expect(
      burgerConstructorReducer(initialState, {} as TBurgerConstructorActions)
    ).toEqual({
      ...initialState
    });
  });

  it('should get constructor', () => {
    expect(
      burgerConstructorReducer(initialState, getOfBurgerConstructorAction())
    ).toEqual({
      ...initialState
    });
  });

  it('should add bun to constructor', () => {
    expect(
      burgerConstructorReducer(initialState, addBun(testIngredient))
    ).toEqual({
      ...initialState,
      buns: testIngredient
    });
  });

  it('should add ingredient', () => {
    expect(
      burgerConstructorReducer(initialState, addIngredient(testIngredient))
    ).toEqual({
      ...initialState,
      burgerConstructor: [...initialState.burgerConstructor, testIngredient]
    });
  });

  it('should remove ingredient', () => {
    expect(
      burgerConstructorReducer(
        {
          ...initialState,
          burgerConstructor: [testIngredient, { ...testIngredient, _id: v4() }]
        },
        removeIngredientAction([testIngredient])
      )
    ).toEqual({
      ...initialState,
      burgerConstructor: [testIngredient]
    });
  });

  it('should recalculate amount', () => {
    expect(
      burgerConstructorReducer(initialState, recalculateAmountAction(12))
    ).toEqual({
      ...initialState,
      amount: 12
    });
  });

  it('should move ingredient', () => {
    const newBurgerConstructor: Ingredient[] = [
      testIngredient,
      { ...testIngredient, _id: v4() },
      { ...testIngredient, _id: v4() }
    ];
    const dragIndex = 2;
    const hoverIndex = 0;

    const dragItem = newBurgerConstructor[dragIndex];
    const updatedIngredients = [...newBurgerConstructor];
    updatedIngredients.splice(dragIndex, 1);
    updatedIngredients.splice(hoverIndex, 0, dragItem);
    expect(
      burgerConstructorReducer(
        initialState,
        moveIngredientAction(updatedIngredients)
      )
    ).toEqual({
      ...initialState,
      burgerConstructor: updatedIngredients
    });
  });

  it('should make order', () => {
    expect(burgerConstructorReducer(initialState, getOrder(testOrder))).toEqual(
      {
        ...initialState,
        order: testOrder
      }
    );
  });

  it('should clear order', () => {
    expect(burgerConstructorReducer(initialState, clearOrderAction())).toEqual({
      ...initialState,
      burgerConstructor: [],
      buns: undefined
    });
  });

  it('should catch order error', () => {
    expect(
      burgerConstructorReducer(initialState, getError({ error: 'lalala' }))
    ).toEqual({
      ...initialState,
      error: {
        error: 'lalala'
      }
    });
  });

  it('should make order request', () => {
    expect(burgerConstructorReducer(initialState, makeRequest())).toEqual({
      ...initialState,
      loading: true
    });
  });
});
