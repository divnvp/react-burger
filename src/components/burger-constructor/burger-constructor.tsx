import burgerConstructorStyle from './burger-constructor.module.css';
import {
  Button,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../../shared/models/ingredient.type';
import React, { useEffect, useState } from 'react';
import BurgerConstructorElement from '../burger-constructor-element/burger-constructor-element';

type Props = {
  data: Ingredient[];
};

function BurgerConstructor(props: Props) {
  const [amount, setAmout] = useState<number>(0);

  useEffect(() => {
    if (props.data.length) {
      setAmout(props.data[0].price * 2);
    }
  }, [props.data]);

  return (
    <div className={`mt-25 ${burgerConstructorStyle.gridColumn}`}>
      {props.data.length ? (
        <section className={`mb-10 ${burgerConstructorStyle.grid}`}>
          <BurgerConstructorElement
            type='top'
            title={`${props.data[0].name} (верх)`}
            price={props.data[0].price}
            thumbnail={props.data[0].image_mobile}
            isLocked={true}
          />

          <div
            className={`${burgerConstructorStyle.scrollbar} ${burgerConstructorStyle.elementsGrid}`}
          ></div>

          <BurgerConstructorElement
            type='bottom'
            title={`${props.data[0].name} (низ)`}
            price={props.data[0].price}
            thumbnail={props.data[0].image_mobile}
            isLocked={true}
          />
        </section>
      ) : (
        ''
      )}

      <section className={burgerConstructorStyle.buttonGrid}>
        <p className='text text_type_digits-medium'>{amount}</p>
        <CurrencyIcon type='primary' className='mr-10' />
        <Button htmlType='button' type='primary' size='medium'>
          Оформить заказ
        </Button>
      </section>
    </div>
  );
}

export default BurgerConstructor;
