import {
  Counter,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import cardStyles from './burger-ingredients.module.css';
import React from 'react';
import { Simulate } from 'react-dom/test-utils';
import { useDrag } from 'react-dnd';
import { DndType } from '../../shared/consts/dnd-type.enum';

type Props = {
  title: string;
  price: number;
  srcImg: string;
  count?: number;
};

function BurgerIngredientsCard(props: Props) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DndType.NewIngredient,
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  }));

  return (
    <div className={cardStyles.card} ref={drag}>
      {props.count ? (
        <div className={`${cardStyles.counter}`}>
          <Counter count={1} size='default' />
        </div>
      ) : (
        ''
      )}
      <img src={props.srcImg} alt={props.title} />
      <div className={`pt-1 pb-1 ${cardStyles.price}`}>
        <p className='text text_type_digits-default pr-2'>{props.price}</p>
        <CurrencyIcon type='primary' />
      </div>
      <p>{props.title}</p>
    </div>
  );
}

export default BurgerIngredientsCard;
