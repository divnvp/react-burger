import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";

type Props = {
  title: string;
  price: number;
  thumbnail: string;
  isLocked?: boolean;
  type?: "top" | "bottom" | undefined
}

function BurgerConstructorElement(props: Props) {
  return (
    <div>
      {props.isLocked ?
        <div className="ml-6">
          <ConstructorElement
            type={props.type}
            text={props.title}
            price={props.price}
            thumbnail={props.thumbnail}
            isLocked={true}
          />
        </div> :
        <div>
          <DragIcon type="primary" />
          <ConstructorElement
            type={props.type}
            text={props.title}
            price={props.price}
            thumbnail={props.thumbnail}
          />
        </div>}
    </div>
  )
}

export default BurgerConstructorElement;
