import burgerConstructorStyle from './burger-constructor.module.css'
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Data} from "../../shared/models/data.type";
import React, {useEffect, useState} from "react";
import BurgerConstructorElement from "../burger-constructor-element/burger-constructor-element";
import {IngredientType} from "../../shared/consts/ingredient-type.enum";

type Props = {
  data: Data[]
}

function BurgerConstructor(props: Props) {
  const [amount, setAmout] = useState<number>(0);

  const getTitle = (element: Data, index: number) => {
    if (index === 0 && element.type === IngredientType.Bun) {
      return `${element.name} (верх)`;
    }
    if (index === props.data.length-1 && element.type === IngredientType.Bun) {
      return `${element.name} (низ)`
    }
    return element.name
  }

  const getLocked = (element: Data, index: number) => {
    return (index === 0 && element.type === IngredientType.Bun) ||
      (index === props.data.length - 1 && element.type === IngredientType.Bun);
  }

  const getType = (index: number) => {
    return index === 0 ? "top" : index === props.data.length - 1 ? "bottom" : undefined;
  }

  useEffect(() => {
    setAmout(props.data.reduce((previousValue, currentValue) => previousValue + currentValue.price, 0))
  }, [props.data]);

  return (
    <div className={`mt-25 ${burgerConstructorStyle.gridColumn}`}>
      <div className={`mb-10 ${burgerConstructorStyle.grid} ${burgerConstructorStyle.scrollbar}`}>
        {props.data.map((element, index) => (
          <BurgerConstructorElement
            key={element._id}
            type={getType(index)}
            title={getTitle(element, index)}
            price={element.price}
            thumbnail={element.image_mobile}
            isLocked={getLocked(element, index)}
          />
        ))}
      </div>

      <div className={burgerConstructorStyle.buttonGrid}>
        <p className="text text_type_digits-medium">{amount}</p>
        <CurrencyIcon type="primary" className="mr-10" />
        <Button htmlType="button" type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
    </div>
  )
}

export default BurgerConstructor
