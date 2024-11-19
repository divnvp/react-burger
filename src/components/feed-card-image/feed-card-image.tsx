import feedCardImageStyles from './feed-card-image.module.css';

type FeedCardImageProps = {
  image?: string;
  index: number;
};

export function FeedCardImage({ image, index }: FeedCardImageProps) {
  return (
    <img
      src={image}
      style={{
        position: 'relative',
        right: index * 15,
        zIndex: 9999 - index
      }}
      alt='Ingredient modile'
      className={feedCardImageStyles.image}
    />
  );
}
