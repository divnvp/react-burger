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
import { Ingredient } from '../../shared/models/ingredient.type';
import { IngredientType } from '../../shared/consts/ingredient-type.enum';
import { v4 as uuid4 } from 'uuid';
import { UnknownAction } from 'redux';
import { ErrorType } from '../../shared/models/error.type';
import { Order } from '../../shared/models/order.type';
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

type BurgerConstructorSelector = {
  burgerConstructor: {
    burgerConstructor: Ingredient[];
    buns: Ingredient | null;
    amount: number;
    order: Order;
  };
  error?: ErrorType;
  user: {
    isAuth: boolean;
  };
};

function BurgerConstructor() {
  const dispatch = useDispatch();
  const useBurgerConstructorSelector =
    useSelector.withTypes<BurgerConstructorSelector>();
  const error = useBurgerConstructorSelector(state => state?.error?.message);
  const ingredients = useBurgerConstructorSelector(
    state => state.burgerConstructor.burgerConstructor
  );
  const buns = useBurgerConstructorSelector(
    state => state.burgerConstructor.buns
  );
  const amount = useBurgerConstructorSelector(
    state => state.burgerConstructor.amount
  );
  const isAuth = useBurgerConstructorSelector(state => state.user.isAuth);

  const [{ isOver }, drop] = useDrop({
    accept: DndType.NewIngredient,
    drop: (ingredient: Ingredient) => {
      if (ingredient.type === IngredientType.Bun) {
        dispatch(addBun(ingredient) as unknown as UnknownAction);
      } else {
        dispatch(
          addIngredient({
            ...ingredient,
            uniqueId: uuid4()
          }) as unknown as UnknownAction
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
        ) as unknown as UnknownAction
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
    dispatch(checkUserAuthThunk() as unknown as UnknownAction);
  };

  const makeOrder = () => {
    let orderDetails = [];
    if (buns) {
      orderDetails = [...ingredients.map(v => v._id), buns?._id, buns?._id];
    } else {
      orderDetails = [...ingredients.map(v => v._id)];
    }

    dispatch(fetchMakingOrderThunk(orderDetails) as unknown as UnknownAction);
    setOrderDetails(true);
  };

  const close = () => {
    setOrderDetails(false);
    dispatch(clearOrderAction() as unknown as UnknownAction);
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
        (sum, ingredient) => sum + ingredient?.price,
        buns?.price * 2
      );
    } else if (ingredients.length) {
      totalAmount = ingredients.reduce(
        (sum, ingredient) => sum + ingredient?.price,
        0
      );
    }

    dispatch(recalculateAmountAction(totalAmount) as unknown as UnknownAction);
  };

  const onRemove = (uniqueId: string) => {
    dispatch(
      removeIngredientAction(
        ingredients.filter(v => v && v.uniqueId !== uniqueId)
      ) as unknown as UnknownAction
    );

    dispatch(getOfBurgerConstructorAction() as unknown as UnknownAction);
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
              (ingredient, index) =>
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
