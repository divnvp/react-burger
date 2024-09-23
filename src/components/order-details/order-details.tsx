import { Ingredient } from '../../shared/models/ingredient.type';
import orderDetailsStyles from './order-details.module.css';
import MacronutrientComponent from '../macronutrient/macronutrient';
import { Macronutrient } from '../../shared/consts/macronutrient.enum';

type Props = {
  ingredient: Ingredient;
};

function OrderDetails(props: Props) {
  return (
    <div className={orderDetailsStyles.grid}>
      <img alt={props.ingredient.name} src={props.ingredient.image_large} />
      <p className='text text_type_main-medium pt-4 pb-8'>
        {props.ingredient.name}
      </p>

      <div className={orderDetailsStyles.macronutrients}>
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

export default OrderDetails;
