import { FeedCard } from '../feed-card/feed-card';
import feedListStyles from './feed-list.module.css';
import { Feed } from '../../shared/models/feed.type';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import { useEffect } from 'react';
import { closeConnection, getUserOrders } from '../../services/actions/ws';
import { useDispatch, useSelector } from '../../shared/hooks/store';
import { getCookie } from '../../shared/utils/get-cookie';

export function FeedList() {
  const dispatch = useDispatch();
  const location = useLocation();
  const feeds: Feed | undefined = useSelector(state => state.feeds?.feeds);

  useEffect(() => {
    dispatch(
      getUserOrders(
        `orders?token=${getCookie('accessToken')?.split('Bearer ')[1]}`
      )
    );

    return () => {
      dispatch(closeConnection());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={feedListStyles.feedGrid}>
      {feeds?.orders?.length ? (
        feeds?.orders?.map(v => (
          <Link
            key={v._id}
            to={v._id}
            state={{ backgroundLocation: location }}
            className={feedListStyles.link}
          >
            <FeedCard
              ingredients={v.ingredients}
              number={v.number}
              createdAt={v.createdAt}
              name={v.name}
              status={v.status}
            />
          </Link>
        ))
      ) : (
        <p className='text text_type_main-medium'>Нет заказов</p>
      )}
    </div>
  );
}
