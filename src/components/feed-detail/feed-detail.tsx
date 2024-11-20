import feedDetailStyles from './feed-detail.module.css';
import { FeedDetailItem } from '../feed-detail-item/feed-detail-item';
import { v4 } from 'uuid';
import {
  CurrencyIcon,
  FormattedDate
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { Status, statuses } from '../../shared/consts/status.enum';
import { Ingredient } from '../../shared/models/ingredient.type';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { Feed } from '../../shared/models/feed.type';

type FeedDetailSelector = {
  burgerIngredients: {
    ingredients: Ingredient[];
  };
  feeds: any;
};

export function FeedDetail() {
  const { id } = useParams();
  const useFeedDetailSelector = useSelector.withTypes<FeedDetailSelector>();
  const ingredientsList = useFeedDetailSelector(
    state => state.burgerIngredients.ingredients
  );

  const feeds: Feed | undefined = useSelector(
    (state: { feeds?: { feeds: { feeds: Feed } } }) => state.feeds?.feeds.feeds
  );

  const currentFeed = feeds?.orders.find(f => f._id === id);
  const compound = currentFeed?.ingredients?.map(ingredient =>
    ingredientsList.find(i => i._id === ingredient)
  );
  const calculatedAmount = currentFeed?.ingredients
    ?.map(i => ingredientsList?.find(v => v._id === i))
    .reduce((a, b) => a + b!.price, 0);

  const getStateName = (statusCode: Status) => {
    return statuses[statusCode];
  };

  return (
    <>
      {currentFeed && (
        <div className={feedDetailStyles.grid}>
          <div className={feedDetailStyles.gridCard}>
            <p
              className='text text_type_digits-default'
              style={{ textAlign: 'center' }}
            >
              #{currentFeed?.number}
            </p>
            <p className='text text_type_main-medium pt-10 pb-3'>
              {currentFeed?.name}
            </p>
            <p
              className={`text text_type_main-small ${feedDetailStyles.statusText} pb-15`}
            >
              {getStateName(currentFeed.status)}
            </p>
            <p className='text text_type_main-medium pb-6'>Состав:</p>
            <div className={`${feedDetailStyles.scrollbar} pb-10`}>
              {compound?.map(ingredient => (
                <FeedDetailItem ingredient={ingredient} key={v4()} />
              ))}
            </div>
            <div className={`${feedDetailStyles.row} pt-6`}>
              <p className='text text_type_main-small text_color_inactive'>
                <FormattedDate date={new Date(currentFeed?.createdAt!)} />
              </p>
              <div className={`${feedDetailStyles.amount}`}>
                <p className='text text_type_digits-default'>
                  {calculatedAmount}
                </p>
                <CurrencyIcon type='primary' />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
