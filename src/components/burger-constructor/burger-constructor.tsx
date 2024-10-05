import burgerConstructorStyle from './burger-constructor.module.css';
import {
  Button,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useCallback, useEffect, useState } from 'react';
import BurgerConstructorElement from '../burger-constructor-element/burger-constructor-element';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { DndType } from '../../shared/consts/dnd-type.enum';
import {
  AMOUNT_RECALCULATING,
  BUN_ADDING,
  BURGER_CONSTRUCTOR_GETTING,
  INGREDIENT_ADDING,
  INGREDIENT_MOVING,
  INGREDIENT_REMOVING,
  MAKING_ORDER
} from '../../services/actions/burger-constructor';
import { Ingredient } from '../../shared/models/ingredient.type';
import { IngredientType } from '../../shared/consts/ingredient-type.enum';
import { makeOrder } from '../../shared/api/data.service';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const ingredients = useSelector(
    (state: { burgerConstructor: { burgerConstructor: Ingredient[] } }) => {
      return state.burgerConstructor.burgerConstructor;
    }
  );
  const buns = useSelector(
    (state: { burgerConstructor: { buns: Ingredient } }) => {
      return state.burgerConstructor.buns;
    }
  );
  const amount = useSelector(
    (state: { burgerConstructor: { amount: number } }) => {
      return state.burgerConstructor.amount;
    }
  );
  const [error, setError] = useState('');

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
  const moveIngredient = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragItem = ingredients[dragIndex];
      const updatedIngredients = [...ingredients];
      updatedIngredients.splice(dragIndex, 1);
      updatedIngredients.splice(hoverIndex, 0, dragItem);

      dispatch({
        type: INGREDIENT_MOVING,
        payload: updatedIngredients
      });
    },
    [ingredients, dispatch]
  );

  const [oderDetails, setOrderDetails] = useState<boolean>(false);

  const showOrderDetails = () => {
    createOrder();
  };

  const close = () => {
    setOrderDetails(false);
  };

  const createOrder = async () => {
    try {
      const orderDetails = [...ingredients.map(v => v._id), buns._id, buns._id];
      await makeOrder(orderDetails)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка ${res.status}`);
        })
        .then(orderData => {
          dispatch({
            type: MAKING_ORDER,
            payload: orderData
          });
          setOrderDetails(true);
        });
    } catch (e) {
      setError((e as { message?: string })?.message ?? '');
    }
  };

  useEffect(() => {
    if (Object.keys(buns).length) {
      const totalAmount = ingredients.reduce(
        (sum, ingredient) => sum + ingredient.price,
        buns.price * 2
      );
      dispatch({
        type: AMOUNT_RECALCULATING,
        payload: totalAmount
      });
    } else {
      const totalAmount = ingredients.reduce(
        (sum, ingredient) => sum + ingredient.price,
        0
      );
      dispatch({
        type: AMOUNT_RECALCULATING,
        payload: totalAmount
      });
    }
  }, [ingredients, buns]);

  const onRemove = (index: number) => {
    ingredients.splice(index, 1);

    dispatch({
      type: INGREDIENT_REMOVING,
      payload: ingredients
    });

    dispatch({
      type: BURGER_CONSTRUCTOR_GETTING
    });
  };

  return (
    <div className={`mt-25 ${burgerConstructorStyle.gridColumn}`} ref={drop}>
      {error ? (
        <h1>{error}</h1>
      ) : (
        <Modal isOpen={oderDetails} title='' onClick={close}>
          <OrderDetails />
        </Modal>
      )}

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
                index={index}
                moveIngredient={moveIngredient}
                onRemove={() => onRemove(index)}
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
