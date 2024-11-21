import feedModuleStyles from './feed.module.css';
import { Layout } from '../../components/layout/layout';
import { FeedCard } from '../../components/feed-card/feed-card';
import { Feed } from '../../shared/models/feed.type';
import { Status } from '../../shared/consts/status.enum';
import { Routes as RouteName } from '../../shared/consts/routes';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';

export function FeedPage() {
  const location = useLocation();
  const mocks: Feed | undefined = useSelector(
    (state: { feeds?: { feeds: Feed } }) => state.feeds?.feeds
  );

  return (
    <Layout>
      <div
        className={`${feedModuleStyles.row} pt-10 pr-30 pl-30`}
        style={{ gap: '60px' }}
      >
        <div className={feedModuleStyles.col}>
          <p className='text text_type_main-large pb-6'>Лента заказов</p>
          <div className={feedModuleStyles.feedGrid}>
            {mocks?.orders?.map(v => (
              <Link
                to={`${RouteName.Feed}/${v._id}`}
                state={{ backgroundLocation: location }}
                className={feedModuleStyles.link}
                key={v._id}
              >
                <FeedCard
                  ingredients={v.ingredients}
                  number={v.number}
                  createdAt={v.createdAt}
                  name={v.name}
                />
              </Link>
            ))}
          </div>
        </div>
        <div className={feedModuleStyles.col}>
          <div
            className={`${feedModuleStyles.row} pb-15`}
            style={{ gap: '36px' }}
          >
            <div className={feedModuleStyles.col}>
              <p className='text text_type_main-medium pb-6'>Готовы:</p>
              {mocks?.orders
                ?.filter(o => o.status === Status.Done)
                .map(o => (
                  <p
                    key={o._id}
                    className={`text text_type_digits-default ${feedModuleStyles.orderNumberText}`}
                  >
                    {o.number}
                  </p>
                ))}
            </div>
            <div className={feedModuleStyles.col}>
              <p className='text text_type_main-medium pb-6'>В работе:</p>
              {mocks?.orders
                ?.filter(
                  o =>
                    o.status === Status.Pending || o.status === Status.Created
                )
                .map(o => (
                  <p key={o._id} className={`text text_type_digits-default`}>
                    {o.number}
                  </p>
                ))}
            </div>
          </div>
          <p className='text text_type_main-medium'>Выполнено за все время:</p>
          <p className='text text_type_digits-large pb-15'>{mocks?.total}</p>
          <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
          <p className='text text_type_digits-large'> {mocks?.totalToday}</p>
        </div>
      </div>
    </Layout>
  );
}
