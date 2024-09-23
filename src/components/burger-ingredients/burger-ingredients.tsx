import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients';
import ingredientsStyles from './burger-ingredients.module.css';
import { Data } from '../../shared/models/data.type';
import { IngredientType } from '../../shared/consts/ingredient-type.enum';

type Props = {
  data: Data[];
  onClick: (element: Data) => unknown;
};

function BurgerIngredients(props: Props) {
  const [current, setCurrent] = React.useState('one');

  return (
    <div className={`pt-10`}>
      <p className='text text_type_main-large pb-5'>Соберите бургер</p>

      <div style={{ display: 'flex' }} className='mb-10'>
        <Tab value='one' active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value='two' active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value='three' active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>

      {props.data.length ? (
        <div className={`${ingredientsStyles.scrollbar}`}>
          <section className={`mb-10 ${ingredientsStyles.wrapper}`}>
            <p className='text text_type_main-medium'>Булки</p>
            <div className={ingredientsStyles.wrap}>
              {props.data.map((element, index) =>
                element.type === IngredientType.Bun ? (
                  <div key={element._id} onClick={() => props.onClick(element)}>
                    <BurgerIngredientsCard
                      srcImg={element.image}
                      price={element.price}
                      title={element.name}
                      count={index === 0 ? 1 : undefined}
                    />
                  </div>
                ) : (
                  ''
                )
              )}
            </div>
          </section>

          <section className={`${ingredientsStyles.wrapper} pt-10 pb-10`}>
            <p className='text text_type_main-medium pb-6'>Соусы</p>
            <div className={ingredientsStyles.wrap}>
              {props.data.map(element =>
                element.type === IngredientType.Sauce ? (
                  <div key={element._id} onClick={() => props.onClick(element)}>
                    <BurgerIngredientsCard
                      srcImg={element.image}
                      price={element.price}
                      title={element.name}
                    />
                  </div>
                ) : (
                  ''
                )
              )}
            </div>
          </section>

          <section className={ingredientsStyles.wrapper}>
            <p className='text text_type_main-medium pb-6'>Начинки</p>
            <div className={ingredientsStyles.wrap}>
              {props.data.map(element =>
                element.type === IngredientType.Main ? (
                  <div key={element._id} onClick={() => props.onClick(element)}>
                    <BurgerIngredientsCard
                      srcImg={element.image}
                      price={element.price}
                      title={element.name}
                    />
                  </div>
                ) : (
                  ''
                )
              )}
            </div>
          </section>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default BurgerIngredients;
