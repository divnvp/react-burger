import burgerConstructorStyle from './burger-constructor.module.css';
import {
  Button,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useCallback, useEffect, useState } from 'react';
import BurgerConstructorElement from '../burger-constructor-element/burger-constructor-element';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { useDrop } from 'react-dnd';
import { DndType } from '../../shared/consts/dnd-type.enum';
import { Ingredient } from '../../shared/models/ingredient.type';
import { IngredientType } from '../../shared/consts/ingredient-type.enum';
import { v4 as uuid4 } from 'uuid';
import { checkUserAuthThunk } from '../../services/actions/login';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../shared/consts/routes';
import {
  addBun,
  addIngredient,
  clearOrderAction,
  fetchMakingOrderThunk,
  getOfBurgerConstructorAction,
  moveIngredientAction,
  recalculateAmountAction,
  removeIngredientAction
} from '../../services/actions/burger-constructor';
import { useDispatch, useSelector } from '../../shared/hooks/store';
import { AppThunkAction } from '../../services/types';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const error = useSelector(state => state?.error?.message);
  const ingredients = useSelector(
    state => state.burgerConstructor.burgerConstructor
  );
  const buns = useSelector(state => state.burgerConstructor.buns);
  const amount = useSelector(state => state.burgerConstructor.amount);
  const isAuth = useSelector(state => state.user.isAuth);

  const [{ isOver }, drop] = useDrop({
    accept: DndType.NewIngredient,
    drop: (ingredient: Ingredient) => {
      if (ingredient.type === IngredientType.Bun) {
        dispatch(addBun(ingredient) as unknown as AppThunkAction);
      } else {
        dispatch(
          addIngredient({
            ...ingredient,
            uniqueId: uuid4()
          }) as unknown as AppThunkAction
        );
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

      dispatch(
        moveIngredientAction(
          updatedIngredients.filter(v => v !== undefined)
        ) as unknown as AppThunkAction
      );
    },
    [ingredients, dispatch]
  );
  const navigate = useNavigate();
  const [oderDetails, setOrderDetails] = useState<boolean>(false);
  const [makingOrder, setMakingOrder] = useState<boolean>(false);
  const [isCartEmpty, setIsCartEmpty] = useState<boolean>(true);

  const showOrderDetails = () => {
    setMakingOrder(true);
    dispatch(checkUserAuthThunk() as unknown as AppThunkAction);
  };

  const makeOrder = () => {
    let orderDetails = [];
    if (buns) {
      orderDetails = [
        ...ingredients.map((v: { _id: string }) => v._id),
        buns?._id,
        buns?._id
      ];
    } else {
      orderDetails = [...ingredients.map((v: { _id: string }) => v._id)];
    }

    dispatch(fetchMakingOrderThunk(orderDetails) as unknown as AppThunkAction);
    setOrderDetails(true);
  };

  const close = () => {
    setOrderDetails(false);
    dispatch(clearOrderAction() as unknown as AppThunkAction);
    setMakingOrder(false);
    setIsCartEmpty(true);
  };

  useEffect(() => {
    recalculateAmount();
  }, [ingredients, buns]);

  const recalculateAmount = () => {
    let totalAmount = 0;
    if (buns && Object.keys(buns).length) {
      setIsCartEmpty(false);
      totalAmount = ingredients.reduce(
        (sum: number, ingredient: Ingredient) => sum + ingredient?.price,
        buns?.price * 2
      );
    } else if (ingredients.length) {
      totalAmount = ingredients.reduce(
        (sum: number, ingredient: Ingredient) => sum + ingredient?.price,
        0
      );
    }

    dispatch(recalculateAmountAction(totalAmount) as unknown as AppThunkAction);
  };

  const onRemove = (uniqueId: string) => {
    dispatch(
      removeIngredientAction(
        ingredients.filter((v: Ingredient) => v && v.uniqueId !== uniqueId)
      ) as unknown as AppThunkAction
    );

    dispatch(getOfBurgerConstructorAction() as unknown as AppThunkAction);
  };

  useEffect(() => {
    if (makingOrder) {
      if (isAuth) {
        makeOrder();
      } else {
        close();
        navigate(Routes.Login, { replace: true });
      }
    }
  }, [isAuth, makingOrder]);

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
        {buns && Object.keys(buns).length ? (
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
            {ingredients.map(
              (ingredient: Ingredient, index?: number) =>
                ingredient?._id && (
                  <BurgerConstructorElement
                    key={ingredient.uniqueId}
                    title={`${ingredient.name}`}
                    price={ingredient.price}
                    thumbnail={ingredient.image_mobile}
                    isLocked={false}
                    index={index}
                    moveIngredient={moveIngredient}
                    onRemove={() => onRemove(ingredient.uniqueId!)}
                  />
                )
            )}
          </div>
        ) : (
          ''
        )}

        {buns && Object.keys(buns).length ? (
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

      {!ingredients.length && !buns?._id && (
        <section className={`mb-10 ${burgerConstructorStyle.noElementsGrid}`}>
          <div
            className={`pt-25 pb-25 ${burgerConstructorStyle.noElementsGridTitle}`}
          >
            <p className='text text_type_main-default text_color_inactive'>
              Пожалуйста, перенесите сюда булку и ингредиенты для создания
              заказа
            </p>
          </div>
        </section>
      )}

      <section className={burgerConstructorStyle.buttonGrid}>
        <p className='text text_type_digits-medium'>{amount}</p>
        <CurrencyIcon type='primary' className='mr-10' />
        <Button
          htmlType='button'
          type='primary'
          size='medium'
          onClick={showOrderDetails}
          disabled={isCartEmpty}
        >
          Оформить заказ
        </Button>
      </section>
    </div>
  );
}

export default BurgerConstructor;
