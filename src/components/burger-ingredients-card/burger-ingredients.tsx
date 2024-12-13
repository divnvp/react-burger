import {
  Counter,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import cardStyles from './burger-ingredients.module.css';
import React from 'react';
import { useDrag } from 'react-dnd';
import { DndType } from '../../shared/consts/dnd-type.enum';
import { Ingredient } from '../../shared/models/ingredient.type';

type Props = {
  element: Ingredient;
  count?: number;
};

function BurgerIngredientsCard(props: Props) {
  const [, drag] = useDrag(
    () => ({
      type: DndType.NewIngredient,
      item: props.element,
      collect: monitor => ({
        isDragging: monitor.isDragging()
      })
    }),
    []
  );

  return (
    <div className={cardStyles.card} ref={drag} id={'dragstart'}>
      {props.count ? (
        <div className={`${cardStyles.counter}`}>
          <Counter count={props.count} size='default' />
        </div>
      ) : (
        ''
      )}
      <img src={props.element.image_mobile} alt={props.element.name} />
      <div className={`pt-1 pb-1 ${cardStyles.price}`}>
        <p className='text text_type_digits-default pr-2'>
          {props.element.price}
        </p>
        <CurrencyIcon type='primary' />
      </div>
      <p>{props.element.name}</p>
    </div>
  );
}

export default BurgerIngredientsCard;
