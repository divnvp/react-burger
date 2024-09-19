import burgerConstructorStyle from './burger-constructor.module.css'
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Data} from "../../shared/models/data.type";
import React, {useEffect, useState} from "react";
import BurgerConstructorElement from "../burger-constructor-element/burger-constructor-element";
import {IngredientType} from "../../shared/consts/ingredient-type.enum";

type Props = {
  data: Data[],
  cart: Data[]
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

  useEffect(() => {
    setAmout(props.data.reduce((previousValue, currentValue) => previousValue + currentValue.price, 0))
  }, [props.data]);

  return (
    <div className={`mt-25 ${burgerConstructorStyle.gridColumn}`}>
      {
        props.data.length ?
        <div className={`mb-10 ${burgerConstructorStyle.grid}`}>
          <BurgerConstructorElement
            type="top"
            title={`${props.data[0].name} (верх)`}
            price={props.data[0].price}
            thumbnail={props.data[0].image_mobile}
            isLocked={true}
          />

          <div className={`${burgerConstructorStyle.scrollbar} ${burgerConstructorStyle.elementsGrid}`}>
            {props.cart.map((element, index) => (
              <BurgerConstructorElement
                key={index}
                title={getTitle(element, index)}
                price={element.price}
                thumbnail={element.image_mobile}
                isLocked={false}
              />
            ))}
          </div>

          <BurgerConstructorElement
            type="bottom"
            title={`${props.data[0].name} (низ)`}
            price={props.data[0].price}
            thumbnail={props.data[0].image_mobile}
            isLocked={true}
          />
        </div> :
          ''
      }

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
