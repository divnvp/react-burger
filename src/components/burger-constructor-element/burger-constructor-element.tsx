import {
  ConstructorElement,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import constructorElementStyles from './burger-constructor-element.module.css';
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd';
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
  onRemove?: () => void;
};

function BurgerConstructorElement(props: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: DndType.Ingredient,
    item: { index: props.index },
    collect: monitor => {
      return {
        isDragging: monitor.isDragging()
      };
    }
  }));

  const [{ isOver }, drop] = useDrop({
    accept: DndType.Ingredient,
    hover: (item: Props, monitor) => {
      calculateNewElementPosition(item, monitor);
    },
    collect: monitor => ({
      isOver: monitor.isOver()
    })
  });

  const calculateNewElementPosition = (
    item: Props,
    monitor: DropTargetMonitor<Props, unknown>
  ) => {
    if (!ref.current) {
      return;
    }

    if (item.index !== undefined) {
      const dragIndex = item.index;
      const dropIndex = props.index;

      if (dropIndex === dragIndex) {
        return;
      }

      props.moveIngredient!(dragIndex, dropIndex!);
      item.index = dropIndex!;
    }
  };

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
            handleClose={props.onRemove}
          />
        </div>
      )}
    </>
  );
}

export default BurgerConstructorElement;
