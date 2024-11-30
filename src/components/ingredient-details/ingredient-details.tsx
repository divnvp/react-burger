import ingredientDetailsStyles from './ingredient-details.module.css';
import MacronutrientComponent from '../macronutrient/macronutrient';
import { Macronutrient } from '../../shared/consts/macronutrient.enum';
import { useParams } from 'react-router';
import { useSelector } from '../../shared/hooks/store';
import { Ingredient } from '../../shared/models/ingredient.type';

function IngredientDetails() {
  const { id } = useParams();
  const ingredients = useSelector(state => state.burgerIngredients.ingredients);
  const ingredient = ingredients.find((v: Ingredient) => v._id === id);

  return (
    <>
      {ingredient && (
        <div className={ingredientDetailsStyles.grid}>
          <img alt={ingredient.name} src={ingredient.image_large} />
          <p className='text text_type_main-medium pt-4 pb-8'>
            {ingredient.name}
          </p>

          <div className={ingredientDetailsStyles.macronutrients}>
            <MacronutrientComponent
              value={ingredient.calories}
              name={`${Macronutrient.Calories},ккал`}
            />
            <MacronutrientComponent
              value={ingredient.proteins}
              name={`${Macronutrient.Proteins},г`}
            />
            <MacronutrientComponent
              value={ingredient.fat}
              name={`${Macronutrient.Fat},г`}
            />
            <MacronutrientComponent
              value={ingredient.carbohydrates}
              name={`${Macronutrient.Carbohydrates},г`}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default IngredientDetails;
