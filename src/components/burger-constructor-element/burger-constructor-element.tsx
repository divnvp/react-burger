import {
  ConstructorElement,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import constructorElementStyles from './burger-constructor-element.module.css';
import { useDrag } from 'react-dnd';
import { DndType } from '../../shared/consts/dnd-type.enum';

type Props = {
  title: string;
  price: number;
  thumbnail: string;
  isLocked?: boolean;
  type?: 'top' | 'bottom' | undefined;
};

function BurgerConstructorElement(props: Props) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DndType.Ingredient,
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  }));

  return (
    <>
      {props.isLocked ? (
        <div className={`${constructorElementStyles.fullWidth}`}>
          <ConstructorElement
            type={props.type}
            text={props.title}
            price={props.price}
            thumbnail={props.thumbnail}
            isLocked={true}
          />
        </div>
      ) : (
        <div className={constructorElementStyles.grid} ref={drag}>
          <DragIcon type='primary' />
          <ConstructorElement
            type={props.type}
            text={props.title}
            price={props.price}
            thumbnail={props.thumbnail}
          />
        </div>
      )}
    </>
  );
}

export default BurgerConstructorElement;
