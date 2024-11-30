import { Ingredient } from '../../shared/models/ingredient.type';
import { FeedCardImage } from '../feed-card-image/feed-card-image';
import feedDetailItemStyles from './feed-detail-item.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';

type FeedDetailItemProps = {
  ingredient?: Ingredient;
  counts?: { [key: string]: number };
};

export function FeedDetailItem({ ingredient, counts }: FeedDetailItemProps) {
  return (
    <div className={`${feedDetailItemStyles.grid} pl-5 pr-6`}>
      <FeedCardImage image={ingredient?.image_mobile} index={1} />
      <p
        className={`text text_type_main-small ${feedDetailItemStyles.ingredientName}`}
      >
        {ingredient?.name}
      </p>
      <div className={feedDetailItemStyles.amount}>
        <p className='text text_type_digits-default pr-2'>
          {counts && counts[ingredient!._id] > 1
            ? `${counts[ingredient!._id]} x `
            : ''}
          {ingredient?.price}
        </p>
        <CurrencyIcon type='primary' />
      </div>
    </div>
  );
}
