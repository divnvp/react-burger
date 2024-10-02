import burgerConstructorStyle from './burger-constructor.module.css';
import {
  Button,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../../shared/models/ingredient.type';
import React, { SetStateAction, useEffect, useState } from 'react';
import BurgerConstructorElement from '../burger-constructor-element/burger-constructor-element';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { useSelector } from 'react-redux';

function BurgerConstructor() {
  const ingredients = useSelector((state: unknown) => {
    return (state as { burgerIngredients: { ingredients: Ingredient[] } })
      .burgerIngredients.ingredients;
  });

  const [amount, setAmount] = useState<number>(0);
  const [oderDetails, setOrderDetails] = useState<boolean>(false);
  const [cart, setCart] = useState<Ingredient[]>([]);

  useEffect(() => {
    if (ingredients?.length) {
      const localCart = Object.freeze(ingredients);
      setCart(localCart.slice(1, 6) as SetStateAction<Ingredient[]>);
    }
  }, [ingredients]);

  useEffect(() => {
    if (cart.length) {
      setAmount(
        cart.reduce(
          (previousValue, currentValue) => previousValue + currentValue.price,
          ingredients[0].price * 2
        )
      );
    }
  }, [cart]);

  const showOrderDetails = () => {
    setOrderDetails(true);
  };

  const close = () => {
    setOrderDetails(false);
  };

  return (
    <div className={`mt-25 ${burgerConstructorStyle.gridColumn}`}>
      <Modal isOpen={oderDetails} title='' onClick={close}>
        <OrderDetails />
      </Modal>

      {ingredients.length ? (
        <section className={`mb-10 ${burgerConstructorStyle.grid}`}>
          <BurgerConstructorElement
            type='top'
            title={`${ingredients[0].name} (верх)`}
            price={ingredients[0].price}
            thumbnail={ingredients[0].image_mobile}
            isLocked={true}
          />

          <div
            className={`${burgerConstructorStyle.scrollbar} ${burgerConstructorStyle.elementsGrid}`}
          >
            {cart.map((ingredient, index) => (
              <BurgerConstructorElement
                key={index}
                title={`${ingredient.name}`}
                price={ingredient.price}
                thumbnail={ingredient.image_mobile}
                isLocked={false}
              />
            ))}
          </div>

          <BurgerConstructorElement
            type='bottom'
            title={`${ingredients[0].name} (низ)`}
            price={ingredients[0].price}
            thumbnail={ingredients[0].image_mobile}
            isLocked={true}
          />
        </section>
      ) : (
        ''
      )}

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
