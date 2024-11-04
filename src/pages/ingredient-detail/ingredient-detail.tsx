import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { Layout } from '../../components/layout/layout';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredientsThunk } from '../../services/actions/burger-ingredients';
import { UnknownAction } from 'redux';
import { Ingredient } from '../../shared/models/ingredient.type';
import { INGREDIENT_DETAILS_GETTING } from '../../services/actions/ingredient-details';

export function IngredientDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const ingredients = useSelector((state: unknown) => {
    return (state as { burgerIngredients: { ingredients: Ingredient[] } })
      .burgerIngredients.ingredients;
  });

  useEffect(() => {
    dispatch(fetchIngredientsThunk() as unknown as UnknownAction);
  }, []);

  useEffect(() => {
    if (ingredients.length) {
      const element = ingredients.find(ingredient => ingredient._id === id);
      if (element) {
        dispatch({
          type: INGREDIENT_DETAILS_GETTING,
          payload: element
        });
      }
    }
  }, [ingredients]);

  return (
    <Layout>
      <IngredientDetails />
    </Layout>
  );
}
