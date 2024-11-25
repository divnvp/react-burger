import feedCardStyles from './feed-card.module.css';
import { FeedDetail } from '../../shared/models/feed.type';
import {
  CurrencyIcon,
  FormattedDate
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { FeedCardImages } from '../feed-card-images/feed-card-images';
import { useSelector } from 'react-redux';
import { Ingredient } from '../../shared/models/ingredient.type';
import { Status, statuses } from '../../shared/consts/status.enum';

type FeedCardSelector = {
  burgerIngredients: {
    ingredients: Ingredient[];
  };
};

export function FeedCard({
  ingredients,
  createdAt,
  number,
  name,
  status
}: Partial<FeedDetail>) {
  const useFeedCardSelector = useSelector.withTypes<FeedCardSelector>();
  const ingredientsList = useFeedCardSelector(
    state => state.burgerIngredients.ingredients
  );
  const calculatedAmount = ingredients
    ?.map(i => ingredientsList?.find(v => v._id === i))
    .reduce((a, b) => a + (b?.price ?? 0), 0);

  const getStateName = (statusCode: Status) => {
    return statuses[statusCode];
  };

  return (
    <div className={feedCardStyles.card}>
      <div className={feedCardStyles.row}>
        <p className='text text_type_digits-default'>#{number}</p>
        <p className='text text_type_main-small text_color_inactive'>
          <FormattedDate date={new Date(createdAt!)} />
        </p>
      </div>
      <p className='text text_type_main-medium pt-6'>{name}</p>
      <p
        className={`text text_type_main-small pt-2 pb-6 ${status === Status.Done ? feedCardStyles.statusSuccessText : null}`}
      >
        {getStateName(status as Status)}
      </p>
      <div className={`${feedCardStyles.row} pt-6`}>
        <FeedCardImages ingredients={ingredients!} />
        <div className={`${feedCardStyles.amount}`}>
          <p className='text text_type_digits-default'>{calculatedAmount}</p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </div>
  );
}
