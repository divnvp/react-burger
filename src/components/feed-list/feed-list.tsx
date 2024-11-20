import { FeedCard } from '../feed-card/feed-card';
import feedListStyles from './feed-list.module.css';
import { Feed } from '../../shared/models/feed.type';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Routes as RouteName } from '../../shared/consts/routes';

export function FeedList() {
  const navigate = useNavigate();
  const mocks: Feed | undefined = useSelector(
    (state: { feeds?: { feeds: { feeds: Feed } } }) => state.feeds?.feeds.feeds
  );

  return (
    <div className={feedListStyles.feedGrid}>
      {mocks?.orders?.map(v => (
        <FeedCard
          key={v._id}
          ingredients={v.ingredients}
          number={v.number}
          createdAt={v.createdAt}
          name={v.name}
          click={() => navigate(`${v._id}`)}
        />
      ))}
    </div>
  );
}
