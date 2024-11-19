import feedCardStyles from './feed-card-images.module.css';
import { useSelector } from 'react-redux';
import { Ingredient } from '../../shared/models/ingredient.type';
import { v4 } from 'uuid';

type FeedCardImagesProps = {
  ingredients: string[];
};

type FeedCardImagesSelector = {
  burgerIngredients: {
    ingredients: Ingredient[];
  };
};

export function FeedCardImages({ ingredients }: FeedCardImagesProps) {
  const useFeedCardImagesSelector =
    useSelector.withTypes<FeedCardImagesSelector>();
  const ingredientsList = useFeedCardImagesSelector(
    state => state.burgerIngredients.ingredients
  );

  const images = ingredients.map(
    ingredient => ingredientsList.find(i => i._id === ingredient)?.image_mobile
  );

  return (
    <div>
      {images.length <= 5
        ? images.map((image, index) => (
            <img
              key={v4()}
              src={image}
              style={{
                position: 'relative',
                right: index * 15,
                zIndex: 9999 - index
              }}
              alt='Ingredient modile'
              className={feedCardStyles.image}
            />
          ))
        : images.slice(0, 6).map((image, index) => (
            <>
              {index <= 4 ? (
                <img
                  key={v4()}
                  src={image}
                  style={{
                    position: 'relative',
                    right: index * 15,
                    zIndex: 9999 - index
                  }}
                  alt='Ingredient modile'
                  className={feedCardStyles.image}
                />
              ) : (
                <>
                  <img
                    key={v4()}
                    src={image}
                    style={{
                      position: 'relative',
                      right: index * 15,
                      zIndex: 9999 - index
                    }}
                    alt='Ingredient modile'
                    className={`${feedCardStyles.image} ${feedCardStyles.moreImage}`}
                  />
                </>
              )}
            </>
          ))}
    </div>
  );
}
