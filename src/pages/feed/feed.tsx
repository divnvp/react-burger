import feedModuleStyles from './feed.module.css';
import { Layout } from '../../components/layout/layout';
import { FeedCard } from '../../components/feed-card/feed-card';
import { Feed } from '../../shared/models/feed.type';
import { v4 } from 'uuid';
import { Status } from '../../shared/consts/status.enum';

export function FeedPage() {
  const mocks: Feed = {
    success: true,
    orders: [
      {
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa0942'
        ],
        _id: v4(),
        status: Status.Done,
        number: '034531',
        name: 'Interstellar бургер',
        createdAt: '2021-06-23T14:43:22.587Z',
        updatedAt: '2021-06-23T14:43:22.603Z'
      },
      {
        ingredients: [
          '643d69a5c3f7b9001cfa0942',
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa0942',
          '643d69a5c3f7b9001cfa093c'
        ],
        _id: v4(),
        status: Status.Done,
        number: '034532',
        name: 'Black Hole Singularity острый бургер',
        createdAt: '2024-11-17T20:13:23.654Z',
        updatedAt: '2021-06-23T20:13:23.657Z'
      },
      {
        ingredients: [
          '643d69a5c3f7b9001cfa0942',
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa0942',
          '643d69a5c3f7b9001cfa0942',
          '643d69a5c3f7b9001cfa0941'
        ],
        _id: v4(),
        status: Status.Done,
        number: '034533',
        name: 'Black Hole Singularity острый бургер',
        createdAt: '2024-11-17T20:13:23.654Z',
        updatedAt: '2021-06-23T20:13:23.657Z'
      },
      {
        ingredients: [
          '643d69a5c3f7b9001cfa0942',
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa0942',
          '643d69a5c3f7b9001cfa0942',
          '643d69a5c3f7b9001cfa0941'
        ],
        _id: v4(),
        status: Status.Pending,
        number: '034533',
        name: 'Black Hole Singularity острый бургер',
        createdAt: '2024-11-17T20:13:23.654Z',
        updatedAt: '2021-06-23T20:13:23.657Z'
      },
      {
        ingredients: [
          '643d69a5c3f7b9001cfa0942',
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa0942',
          '643d69a5c3f7b9001cfa0942',
          '643d69a5c3f7b9001cfa0941'
        ],
        _id: v4(),
        status: Status.Created,
        number: '034533',
        name: 'Black Hole Singularity острый бургер',
        createdAt: '2024-11-17T20:13:23.654Z',
        updatedAt: '2021-06-23T20:13:23.657Z'
      }
    ],
    total: 28752,
    totalToday: 138
  };
  return (
    <Layout>
      <div className={`${feedModuleStyles.row} pt-10`} style={{ gap: '60px' }}>
        <div className={feedModuleStyles.col}>
          <p className='text text_type_main-large pb-6'>Лента заказов</p>
          <div className={feedModuleStyles.feedGrid}>
            {mocks.orders.map(v => (
              <FeedCard
                key={v._id}
                ingredients={v.ingredients}
                number={v.number}
                createdAt={v.createdAt}
                name={v.name}
              />
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
              {mocks.orders
                .filter(o => o.status === Status.Done)
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
              {mocks.orders
                .filter(
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
          <p className='text text_type_digits-large pb-15'>{mocks.total}</p>
          <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
          <p className='text text_type_digits-large'> {mocks.totalToday}</p>
        </div>
      </div>
    </Layout>
  );
}
