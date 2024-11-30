import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { Layout } from '../../components/layout/layout';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../shared/hooks/store';
import { getIngredientDetails } from '../../services/actions/ingredient-details';
import { Ingredient } from '../../shared/models/ingredient.type';

export function IngredientDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const ingredients = useSelector(state => state.burgerIngredients.ingredients);

  useEffect(() => {
    if (ingredients.length) {
      const element = ingredients.find(
        (ingredient: Ingredient) => ingredient._id === id
      );
      if (element) {
        dispatch(getIngredientDetails(element));
      }
    }
  }, [ingredients]);

  return (
    <Layout>
      <IngredientDetails />
    </Layout>
  );
}
