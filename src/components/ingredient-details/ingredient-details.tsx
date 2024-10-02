import ingredientDetailsStyles from './ingredient-details.module.css';
import MacronutrientComponent from '../macronutrient/macronutrient';
import { Macronutrient } from '../../shared/consts/macronutrient.enum';
import { useSelector } from 'react-redux';
import { Ingredient } from '../../shared/models/ingredient.type';

function IngredientDetails() {
  const ingredient = useSelector(state => {
    return (state as { ingredient: { ingredient: Ingredient } }).ingredient
      .ingredient;
  });

  return (
    <>
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
    </>
  );
}

export default IngredientDetails;
