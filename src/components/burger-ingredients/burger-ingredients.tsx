import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import BurgerIngredientsCard from "../burger-ingredients-card/burger-ingredients";
import craterBun from "../../images/crater-bun.png";
import fluorescentBread from "../../images/fluorescent-bread.png";
import ingredientsStyles from './burger-ingredients.module.css'
import souseSpicyX from '../../images/souse-spicy-x.png'
import firmSouseSpaceSauce from '../../images/firm-souse-space-sauce.png'
import souse1 from '../../images/souse-1.png'
import souse2 from '../../images/souse-2.png'

function BurgerIngredients() {
  const [current, setCurrent] = React.useState('one');

  return (
    <div className={`pt-10 ${ingredientsStyles.grid}`}>
      <p className="text text_type_main-large pb-5">Соберите бургер</p>

      <div style={{ display: 'flex' }} className="mb-10">
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>

      <div className={ingredientsStyles.scrollbar}>
        <div className={`mb-10`}>
          <p className="text text_type_main-medium">Булки</p>
          <div className={ingredientsStyles.cardGrid}>
            <BurgerIngredientsCard srcImg={craterBun} price={20} title="Краторная булка N-200i" />
            <BurgerIngredientsCard srcImg={fluorescentBread} price={20} title="Флюоресцентная булка R2-D3" />
          </div>
        </div>

        <div>
          <p className="text text_type_main-medium pb-6">Соусы</p>
          <div className={ingredientsStyles.cardGrid}>
            <BurgerIngredientsCard srcImg={souseSpicyX} price={30} title="Соус Spicy-X" />
            <BurgerIngredientsCard srcImg={firmSouseSpaceSauce} price={30} title="Соус фирменный Space Sauce" />
            <BurgerIngredientsCard srcImg={souse1} price={30} title="Соус фирменный Space Sauce" />
            <BurgerIngredientsCard srcImg={souse2} price={30} title="Соус фирменный Space Sauce" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BurgerIngredients
