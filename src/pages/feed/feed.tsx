import feedModuleStyles from './feed.module.css';
import { Layout } from '../../components/layout/layout';
import { FeedCard } from '../../components/feed-card/feed-card';
import { Feed } from '../../shared/models/feed.type';
import { v4 } from 'uuid';

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
        status: 'done',
        number: 1,
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
        status: 'done',
        number: 3,
        name: 'Black Hole Singularity острый бургер',
        createdAt: '2024-11-17T20:13:23.654Z',
        updatedAt: '2021-06-23T20:13:23.657Z'
      },
      {
        ingredients: [
          '643d69a5c3f7b9001cfa0942',
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa0942',
          '643d69a5c3f7b9001cfa0941'
        ],
        _id: v4(),
        status: 'done',
        number: 3,
        name: 'Black Hole Singularity острый бургер',
        createdAt: '2024-11-17T20:13:23.654Z',
        updatedAt: '2021-06-23T20:13:23.657Z'
      }
    ],
    total: 1,
    totalToday: 1
  };
  return (
    <Layout>
      <div className={feedModuleStyles.row}>
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
          <p>second column</p>
        </div>
      </div>
    </Layout>
  );
}
