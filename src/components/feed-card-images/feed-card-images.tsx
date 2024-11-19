import feedCardStyles from './feed-card-images.module.css';
import { useSelector } from 'react-redux';
import { Ingredient } from '../../shared/models/ingredient.type';
import { v4 } from 'uuid';
import { Fragment } from 'react';
import { FeedCardImage } from '../feed-card-image/feed-card-image';

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
            <FeedCardImage key={v4()} image={image} index={index} />
          ))
        : images.slice(0, 6).map((image, index) => (
            <Fragment key={v4()}>
              <FeedCardImage image={image} index={index} />
              {index >= 5 ? (
                <p
                  className={`text text_type_digits-default ${feedCardStyles.moreImageText}`}
                >
                  +{images.filter((_, index) => index >= 5).length}
                </p>
              ) : (
                ''
              )}
            </Fragment>
          ))}
    </div>
  );
}
