import mainStyles from './main.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorType } from '../../shared/models/error.type';
import { fetchIngredientsThunk } from '../../services/actions/burger-ingredients';
import { UnknownAction } from 'redux';
import { Layout } from '../../components/layout/layout';

export function MainPage() {
  const dispatch = useDispatch();
  const error = useSelector(
    (state: { error?: ErrorType }) => state?.error?.message
  );

  useEffect(() => {
    dispatch(fetchIngredientsThunk() as unknown as UnknownAction);
  }, [dispatch]);

  return (
    <Layout>
      <div className={`text text_type_main-default ${mainStyles.app}`}>
        <main className={mainStyles.parent}>
          {error ? (
            <h1>{error}</h1>
          ) : (
            <DndProvider backend={HTML5Backend}>
              <div>
                <BurgerIngredients />
              </div>
              <div>
                <BurgerConstructor />
              </div>
            </DndProvider>
          )}
        </main>
      </div>
    </Layout>
  );
}
