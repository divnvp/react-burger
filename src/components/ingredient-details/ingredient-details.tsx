import ingredientDetailsStyles from './ingredient-details.module.css';
import MacronutrientComponent from '../macronutrient/macronutrient';
import { Macronutrient } from '../../shared/consts/macronutrient.enum';
import { Ingredient } from '../../shared/models/ingredient.type';

type Props = {
  ingredient: Ingredient;
};

function IngredientDetails(props: Props) {
  return (
    <div className={ingredientDetailsStyles.grid}>
      <img alt={props.ingredient.name} src={props.ingredient.image_large} />
      <p className='text text_type_main-medium pt-4 pb-8'>
        {props.ingredient.name}
      </p>

      <div className={ingredientDetailsStyles.macronutrients}>
        <MacronutrientComponent
          value={props.ingredient.calories}
          name={`${Macronutrient.Calories},ккал`}
        />
        <MacronutrientComponent
          value={props.ingredient.proteins}
          name={`${Macronutrient.Proteins},г`}
        />
        <MacronutrientComponent
          value={props.ingredient.fat}
          name={`${Macronutrient.Fat},г`}
        />
        <MacronutrientComponent
          value={props.ingredient.carbohydrates}
          name={`${Macronutrient.Carbohydrates},г`}
        />
      </div>
    </div>
  );
}

export default IngredientDetails;
