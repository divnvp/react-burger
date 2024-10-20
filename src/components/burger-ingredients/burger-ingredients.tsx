import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useRef, useState } from 'react';
import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients';
import ingredientsStyles from './burger-ingredients.module.css';
import { Ingredient } from '../../shared/models/ingredient.type';
import { IngredientType } from '../../shared/consts/ingredient-type.enum';
import { useDispatch, useSelector } from 'react-redux';
import { INGREDIENT_DETAILS_GETTING } from '../../services/actions/ingredient-details';
import { TabEnum } from '../../shared/consts/tab.enum';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { Routes as RouteName } from '../../shared/consts/routes';

function BurgerIngredients() {
  const location = useLocation();
  const ingredients = useSelector((state: unknown) => {
    return (state as { burgerIngredients: { ingredients: Ingredient[] } })
      .burgerIngredients.ingredients;
  });
  const cart = useSelector(
    (state: { burgerConstructor: { burgerConstructor: Ingredient[] } }) => {
      return state.burgerConstructor.burgerConstructor;
    }
  );
  const buns = useSelector(
    (state: { burgerConstructor: { buns: Ingredient } }) => {
      return state.burgerConstructor.buns;
    }
  );
  const dispatch = useDispatch();
  const [current, setCurrent] = useState('one');

  const onIngredientClick = (element: Ingredient) => {
    dispatch({
      type: INGREDIENT_DETAILS_GETTING,
      payload: element
    });
  };

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
              {ingredients?.map(element =>
                element.type === IngredientType.Bun ? (
                  <Link
                    key={element._id}
                    onClick={() => onIngredientClick(element)}
                    to={`${RouteName.Ingredients}/${element._id}`}
                    state={{ backgroundLocation: location }}
                  >
                    <BurgerIngredientsCard
                      element={element}
                      count={
                        buns &&
                        Object.keys(buns).length &&
                        buns?._id === element?._id
                          ? 2
                          : undefined
                      }
                    />
                  </Link>
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
                element?._id && element.type === IngredientType.Sauce ? (
                  <Link
                    key={element._id}
                    onClick={() => onIngredientClick(element)}
                    to={`${RouteName.Ingredients}/${element._id}`}
                    state={{ backgroundLocation: location }}
                  >
                    <BurgerIngredientsCard
                      element={element}
                      count={
                        cart?.length && element?._id
                          ? cart?.filter(c => c?._id === element?._id).length
                          : undefined
                      }
                    />
                  </Link>
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
                  <Link
                    key={element._id}
                    onClick={() => onIngredientClick(element)}
                    to={`${RouteName.Ingredients}/${element._id}`}
                    state={{ backgroundLocation: location, element }}
                  >
                    <BurgerIngredientsCard
                      element={element}
                      count={
                        cart?.length && element?._id
                          ? cart?.filter(c => c?._id === element?._id).length
                          : undefined
                      }
                    />
                  </Link>
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
