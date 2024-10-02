import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useCallback, useRef, useState } from 'react';
import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients';
import ingredientsStyles from './burger-ingredients.module.css';
import { Ingredient } from '../../shared/models/ingredient.type';
import { IngredientType } from '../../shared/consts/ingredient-type.enum';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { useDispatch, useSelector } from 'react-redux';
import { INGREDIENT_DETAILS_GETTING } from '../../services/actions/ingredient-details';
import { TabEnum } from '../../shared/consts/tab.enum';

function BurgerIngredients() {
  const ingredients = useSelector((state: unknown) => {
    return (state as { burgerIngredients: { ingredients: Ingredient[] } })
      .burgerIngredients.ingredients;
  });
  const ingredient = useSelector((state: unknown) => {
    return (state as { ingredient: { ingredient: Ingredient } }).ingredient
      .ingredient;
  });
  const dispatch = useDispatch();
  const [current, setCurrent] = useState('one');
  const [isModalOpen, setModalOpen] = useState(false);

  const onIngredientClick = (element: Ingredient) => {
    dispatch({
      type: INGREDIENT_DETAILS_GETTING,
      payload: element
    });
    setModalOpen(true);
  };

  const close = useCallback(() => {
    setModalOpen(false);
  }, []);

  const bunRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const scrollBy = (
    ref: React.RefObject<HTMLDivElement>,
    activeTab: TabEnum
  ) => {
    setCurrent(activeTab);
    ref.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <div className={`pt-10`}>
      {ingredient && (
        <Modal isOpen={isModalOpen} title='Детали ингредиента' onClick={close}>
          <IngredientDetails />
        </Modal>
      )}

      <p className='text text_type_main-large pb-5'>Соберите бургер</p>

      <div style={{ display: 'flex' }} className='mb-10'>
        <Tab
          value={TabEnum.One}
          active={current === TabEnum.One}
          onClick={() => scrollBy(bunRef, TabEnum.One)}
        >
          Булки
        </Tab>
        <Tab
          value={TabEnum.Two}
          active={current === TabEnum.Two}
          onClick={() => scrollBy(sauceRef, TabEnum.Two)}
        >
          Соусы
        </Tab>
        <Tab
          value={TabEnum.Three}
          active={current === TabEnum.Three}
          onClick={() => scrollBy(mainRef, TabEnum.Three)}
        >
          Начинки
        </Tab>
      </div>

      {ingredients?.length ? (
        <div className={`${ingredientsStyles.scrollbar}`}>
          <section
            className={`mb-10 ${ingredientsStyles.wrapper}`}
            ref={bunRef}
          >
            <p className='text text_type_main-medium'>Булки</p>
            <div className={ingredientsStyles.wrap}>
              {ingredients?.map((element, index) =>
                element.type === IngredientType.Bun ? (
                  <div
                    key={element._id}
                    onClick={() => onIngredientClick(element)}
                  >
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

          <section
            className={`${ingredientsStyles.wrapper} pt-10 pb-10`}
            ref={sauceRef}
          >
            <p className='text text_type_main-medium pb-6'>Соусы</p>
            <div className={ingredientsStyles.wrap}>
              {ingredients?.map(element =>
                element.type === IngredientType.Sauce ? (
                  <div
                    key={element._id}
                    onClick={() => onIngredientClick(element)}
                  >
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

          <section className={ingredientsStyles.wrapper} ref={mainRef}>
            <p className='text text_type_main-medium pb-6'>Начинки</p>
            <div className={ingredientsStyles.wrap}>
              {ingredients?.map(element =>
                element.type === IngredientType.Main ? (
                  <div
                    key={element._id}
                    onClick={() => onIngredientClick(element)}
                  >
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
