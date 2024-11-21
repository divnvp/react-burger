import { FeedCard } from '../feed-card/feed-card';
import feedListStyles from './feed-list.module.css';
import { Feed } from '../../shared/models/feed.type';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';

export function FeedList() {
  const location = useLocation();
  const mocks: Feed | undefined = useSelector(
    (state: { feeds?: { feeds: Feed } }) => state.feeds?.feeds
  );

  return (
    <div className={feedListStyles.feedGrid}>
      {mocks?.orders?.map(v => (
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
          />
        </Link>
      ))}
    </div>
  );
}
