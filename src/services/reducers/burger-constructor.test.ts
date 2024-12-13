import {
  burgerConstructorReducer,
  initialStateOfBurgerConstructor
} from './burger-constructor';
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

describe('Constructor reducer', () => {
  it('should return the initial state', () => {
    expect(
      burgerConstructorReducer(
        initialStateOfBurgerConstructor,
        {} as TBurgerConstructorActions
      )
    ).toEqual({
      ...initialStateOfBurgerConstructor
    });
  });

  it('should get constructor', () => {
    expect(
      burgerConstructorReducer(
        initialStateOfBurgerConstructor,
        getOfBurgerConstructorAction()
      )
    ).toEqual({
      ...initialStateOfBurgerConstructor
    });
  });

  it('should add bun to constructor', () => {
    expect(
      burgerConstructorReducer(
        initialStateOfBurgerConstructor,
        addBun(testIngredient)
      )
    ).toEqual({
      ...initialStateOfBurgerConstructor,
      buns: testIngredient
    });
  });

  it('should add ingredient', () => {
    expect(
      burgerConstructorReducer(
        initialStateOfBurgerConstructor,
        addIngredient(testIngredient)
      )
    ).toEqual({
      ...initialStateOfBurgerConstructor,
      burgerConstructor: [
        ...initialStateOfBurgerConstructor.burgerConstructor,
        testIngredient
      ]
    });
  });

  it('should remove ingredient', () => {
    expect(
      burgerConstructorReducer(
        {
          ...initialStateOfBurgerConstructor,
          burgerConstructor: [testIngredient, { ...testIngredient, _id: v4() }]
        },
        removeIngredientAction([testIngredient])
      )
    ).toEqual({
      ...initialStateOfBurgerConstructor,
      burgerConstructor: [testIngredient]
    });
  });

  it('should recalculate amount', () => {
    expect(
      burgerConstructorReducer(
        initialStateOfBurgerConstructor,
        recalculateAmountAction(12)
      )
    ).toEqual({
      ...initialStateOfBurgerConstructor,
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
        initialStateOfBurgerConstructor,
        moveIngredientAction(updatedIngredients)
      )
    ).toEqual({
      ...initialStateOfBurgerConstructor,
      burgerConstructor: updatedIngredients
    });
  });

  it('should make order', () => {
    expect(
      burgerConstructorReducer(
        initialStateOfBurgerConstructor,
        getOrder(testOrder)
      )
    ).toEqual({
      ...initialStateOfBurgerConstructor,
      order: testOrder
    });
  });

  it('should clear order', () => {
    expect(
      burgerConstructorReducer(
        initialStateOfBurgerConstructor,
        clearOrderAction()
      )
    ).toEqual({
      ...initialStateOfBurgerConstructor,
      burgerConstructor: [],
      buns: undefined
    });
  });

  it('should catch order error', () => {
    expect(
      burgerConstructorReducer(
        initialStateOfBurgerConstructor,
        getError({ error: 'lalala' })
      )
    ).toEqual({
      ...initialStateOfBurgerConstructor,
      error: {
        error: 'lalala'
      }
    });
  });

  it('should make order request', () => {
    expect(
      burgerConstructorReducer(initialStateOfBurgerConstructor, makeRequest())
    ).toEqual({
      ...initialStateOfBurgerConstructor,
      loading: true
    });
  });
});
