import feedDetailStyles from './feed-detail.module.css';
import { FeedDetailItem } from '../feed-detail-item/feed-detail-item';
import { v4 } from 'uuid';
import {
  CurrencyIcon,
  FormattedDate
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect } from 'react';
import { Status, statuses } from '../../shared/consts/status.enum';
import { Ingredient } from '../../shared/models/ingredient.type';
import { useLocation, useParams } from 'react-router';
import { Feed } from '../../shared/models/feed.type';
import {
  closeConnection,
  getUserOrders,
  initWs
} from '../../services/actions/ws';
import { useDispatch, useSelector } from '../../shared/hooks/store';
import { getCookie } from '../../shared/utils/get-cookie';

export function FeedDetail() {
  const dispatch = useDispatch();
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };
  const { id } = useParams();
  const ingredientsList = useSelector(
    state => state.burgerIngredients.ingredients
  );

  const feeds: Feed | undefined = useSelector(
    (state: { feeds?: { feeds: Feed } }) => state.feeds?.feeds
  );

  const currentFeed = feeds?.orders.find(f => f._id === id);
  const mappedIngredients = currentFeed?.ingredients?.map(ingredient =>
    ingredientsList.find((i: Ingredient) => i._id === ingredient)
  );
  const compound = mappedIngredients?.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
  const counts: { [key: string]: number } = {};
  mappedIngredients?.forEach(function (x: Ingredient) {
    counts[x._id] = (counts[x._id] || 0) + 1;
  });
  const calculatedAmount = currentFeed?.ingredients
    ?.map(i => ingredientsList?.find((v: Ingredient) => v._id === i))
    .reduce((a, b) => a + b!.price, 0);

  const getStateName = (statusCode: Status) => {
    return statuses[statusCode];
  };

  useEffect(() => {
    if (!state?.backgroundLocation) {
      if (location.pathname.startsWith('/profile')) {
        dispatch(
          getUserOrders(
            `orders?token=${getCookie('accessToken')?.split('Bearer ')[1]}`
          )
        );
      } else {
        dispatch(initWs('orders/all'));
      }
    }

    return () => {
      dispatch(closeConnection());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                <FeedDetailItem
                  ingredient={ingredient}
                  key={v4()}
                  counts={counts}
                />
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
