import {
  ConstructorElement,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import constructorElementStyles from './burger-constructor-element.module.css';

type Props = {
  title: string;
  price: number;
  thumbnail: string;
  isLocked?: boolean;
  type?: 'top' | 'bottom' | undefined;
};

function BurgerConstructorElement(props: Props) {
  return (
    <>
      {props.isLocked ? (
        <div className='ml-8'>
          <ConstructorElement
            type={props.type}
            text={props.title}
            price={props.price}
            thumbnail={props.thumbnail}
            isLocked={true}
          />
        </div>
      ) : (
        <div className={constructorElementStyles.grid}>
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
