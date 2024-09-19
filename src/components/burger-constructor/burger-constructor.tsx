import craterBun from '../../images/crater-bun.png'
import traditionalSouse from '../../images/traditionalSouse.png'
import protostomia from '../../images/protostomia.png'
import fallenialTree from '../../images/fallenial-tree.png'
import crispyMineralRings from '../../images/crispy-mineral-rings.png'
import BurgerConstructorElement from "../burger-constructor-element/burger-constructor-element";
import burgerConstructorStyle from './burger-constructor.module.css'
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerConstructor() {
  return (
    <div className={`mt-25 ${burgerConstructorStyle.gridColumn}`}>
      <div className={`mb-10 ${burgerConstructorStyle.grid} ${burgerConstructorStyle.scrollbar}`}>
        <BurgerConstructorElement
          title="Краторная булка N-200i (верх)"
          price={20}
          thumbnail={craterBun}
          isLocked={true}
          type="top"
        />
        <BurgerConstructorElement title="Соус традиционный галактический" price={30} thumbnail={traditionalSouse} />
        <BurgerConstructorElement title="Мясо бессмертных моллюсков Protostomia" price={300} thumbnail={protostomia} />
        <BurgerConstructorElement title="Плоды Фалленианского дерева" price={80} thumbnail={fallenialTree} />
        <BurgerConstructorElement title="Хрустящие минеральные кольца" price={80} thumbnail={crispyMineralRings} />
        <BurgerConstructorElement title="Хрустящие минеральные кольца" price={80} thumbnail={crispyMineralRings} />
        <BurgerConstructorElement
          title="Краторная булка N-200i (низ)"
          price={20}
          thumbnail={craterBun}
          isLocked={true}
          type="bottom"
        />
      </div>

      <div className={burgerConstructorStyle.buttonGrid}>
        <p className="text text_type_digits-medium">610</p>
        <CurrencyIcon type="primary" className="mr-10" />
        <Button htmlType="button" type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
    </div>
  )
}

export default BurgerConstructor
