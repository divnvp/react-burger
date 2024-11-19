import feedCardStyles from './feed-card.module.css';
import { FeedDetail } from '../../shared/models/feed.type';
import {
  CurrencyIcon,
  FormattedDate
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { FeedCardImages } from '../feed-card-images/feed-card-images';

export function FeedCard({
  ingredients,
  createdAt,
  number,
  name
}: Partial<FeedDetail>) {
  const calculatedAmount = 560;

  return (
    <div className={feedCardStyles.card}>
      <div className={feedCardStyles.row}>
        <p className='text text_type_digits-default'>#{number}</p>
        <p className='text text_type_main-small text_color_inactive'>
          <FormattedDate date={new Date(createdAt!)} />
        </p>
      </div>
      <p className='text text_type_main-medium pt-6'>{name}</p>
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
