import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import cardStyles from './burger-ingredients.module.css'

type Props = {
  title: string;
  price: number;
  srcImg: string;
}

function BurgerIngredientsCard(props: Props) {
  return (
    <div className={cardStyles.card}>
      <img src={props.srcImg} alt={props.title} />
      <div className={`pt-1 pb-1 ${cardStyles.price}`}>
        <p className="text text_type_digits-default pr-2">{props.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p>{ props.title }</p>
    </div>
  )
}

export default BurgerIngredientsCard
