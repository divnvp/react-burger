import burgerConstructorStyle from './burger-constructor.module.css';
import {
  Button,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import BurgerConstructorElement from '../burger-constructor-element/burger-constructor-element';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { DndType } from '../../shared/consts/dnd-type.enum';
import {
  BUN_ADDING,
  INGREDIENT_ADDING
} from '../../services/actions/burger-constructor';
import { Ingredient } from '../../shared/models/ingredient.type';
import { IngredientType } from '../../shared/consts/ingredient-type.enum';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const ingredients = useSelector(
    (state: { burgerConstructor: { burgerConstructor: Ingredient[] } }) => {
      console.log(state.burgerConstructor);
      return state.burgerConstructor.burgerConstructor;
    }
  );
  const buns = useSelector(
    (state: { burgerConstructor: { buns: Ingredient } }) => {
      console.log(state.burgerConstructor);
      return state.burgerConstructor.buns;
    }
  );
  const [{ isOver }, drop] = useDrop({
    accept: DndType.NewIngredient,
    drop: (ingredient: Ingredient) => {
      if (ingredient.type === IngredientType.Bun) {
        dispatch({
          type: BUN_ADDING,
          payload: ingredient
        });
      } else {
        dispatch({
          type: INGREDIENT_ADDING,
          payload: ingredient
        });
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver()
    })
  });

  const [amount, setAmount] = useState<number>(0);
  const [oderDetails, setOrderDetails] = useState<boolean>(false);

  const showOrderDetails = () => {
    setOrderDetails(true);
  };

  const close = () => {
    setOrderDetails(false);
  };

  return (
    <div className={`mt-25 ${burgerConstructorStyle.gridColumn}`} ref={drop}>
      <Modal isOpen={oderDetails} title='' onClick={close}>
        <OrderDetails />
      </Modal>

      <section className={`mb-10 ${burgerConstructorStyle.grid}`}>
        {Object.keys(buns).length ? (
          <BurgerConstructorElement
            type='top'
            title={`${buns.name} (верх)`}
            price={buns.price}
            thumbnail={buns.image_mobile}
            isLocked={true}
          />
        ) : (
          ''
        )}

        {ingredients.length ? (
          <div
            className={`${burgerConstructorStyle.scrollbar} ${burgerConstructorStyle.elementsGrid}`}
          >
            {ingredients.map((ingredient, index) => (
              <BurgerConstructorElement
                key={index}
                title={`${ingredient.name}`}
                price={ingredient.price}
                thumbnail={ingredient.image_mobile}
                isLocked={false}
              />
            ))}
          </div>
        ) : (
          ''
        )}

        {Object.keys(buns).length ? (
          <BurgerConstructorElement
            type='bottom'
            title={`${buns.name} (низ)`}
            price={buns.price}
            thumbnail={buns.image_mobile}
            isLocked={true}
          />
        ) : (
          ''
        )}
      </section>

      <section className={burgerConstructorStyle.buttonGrid}>
        <p className='text text_type_digits-medium'>{amount}</p>
        <CurrencyIcon type='primary' className='mr-10' />
        <Button
          htmlType='button'
          type='primary'
          size='medium'
          onClick={showOrderDetails}
        >
          Оформить заказ
        </Button>
      </section>
    </div>
  );
}

export default BurgerConstructor;
