import {
  ConstructorElement,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import constructorElementStyles from './burger-constructor-element.module.css';
import { useDrag, useDrop } from 'react-dnd';
import { DndType } from '../../shared/consts/dnd-type.enum';
import { useRef } from 'react';

type Props = {
  title: string;
  price: number;
  thumbnail: string;
  isLocked?: boolean;
  type?: 'top' | 'bottom' | undefined;
  index?: number;
  moveIngredient?: (dragIndex: number, hoverIndex: number) => void;
};

function BurgerConstructorElement(props: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: DndType.Ingredient,
    item: { index: props.index },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  }));

  const [, drop] = useDrop({
    accept: DndType.Ingredient,
    hover: (item: { index: number }) => {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = props.index;

      if (dragIndex === hoverIndex) {
        return;
      }

      if (hoverIndex !== undefined) {
        item.index = hoverIndex;
        props.moveIngredient!(dragIndex, hoverIndex);
      }
    }
  });

  drag(drop(ref));

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
        <div className={constructorElementStyles.grid} ref={ref}>
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
