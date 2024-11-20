import { Layout } from '../../components/layout/layout';
import { FeedDetail } from '../../shared/models/feed.type';
import { useSelector } from 'react-redux';
import { Ingredient } from '../../shared/models/ingredient.type';
import { FeedDetailItem } from '../../components/feed-detail-item/feed-detail-item';
import {
  CurrencyIcon,
  FormattedDate
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import feedDetailItemStyles from './feed-detail.module.css';

type FeedDetailSelector = {
  burgerIngredients: {
    ingredients: Ingredient[];
  };
};

export function FeedDetailPage({
  number,
  name,
  status,
  ingredients,
  createdAt
}: Partial<FeedDetail>) {
  const useFeedDetailSelector = useSelector.withTypes<FeedDetailSelector>();
  const ingredientsList = useFeedDetailSelector(
    state => state.burgerIngredients.ingredients
  );

  const compound = ingredients?.map(ingredient =>
    ingredientsList.find(i => i._id === ingredient)
  );
  const calculatedAmount = ingredients
    ?.map(i => ingredientsList?.find(v => v._id === i))
    .reduce((a, b) => a + b!.price, 0);

  return (
    <Layout>
      <div className={feedDetailItemStyles.grid}>
        <p className='text text_type_digits-default'>#{number}</p>
        <p className='text text_type_main-medium pt-10 pb-3'>{name}</p>
        <p className={`${feedDetailItemStyles.statusText} pb-15`}>{status}</p>
        <p className='text text_type_main-medium pb-6'>Состав:</p>
        <div className={`${feedDetailItemStyles.scrollbar} pb-10`}>
          {compound?.map(ingredient => (
            <FeedDetailItem ingredient={ingredient} />
          ))}
        </div>
        <div className={`${feedDetailItemStyles.row} pt-6`}>
          <p className='text text_type_main-small text_color_inactive'>
            <FormattedDate date={new Date(createdAt!)} />
          </p>
          <div className={`${feedDetailItemStyles.amount}`}>
            <p className='text text_type_digits-default'>{calculatedAmount}</p>
            <CurrencyIcon type='primary' />
          </div>
        </div>
      </div>
    </Layout>
  );
}
