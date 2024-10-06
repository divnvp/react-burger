import React, { useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import appStyles from './app.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredientsThunk } from '../../services/actions/burger-ingredients';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { UnknownAction } from 'redux';
import { ErrorType } from '../../shared/models/error.type';

function App() {
  const dispatch = useDispatch();
  const error = useSelector(
    (state: { error?: ErrorType }) => state?.error?.message
  );

  useEffect(() => {
    dispatch(fetchIngredientsThunk() as unknown as UnknownAction);
  }, [dispatch]);

  return (
    <div className={`text text_type_main-default ${appStyles.app}`}>
      <AppHeader />
      <main className={appStyles.parent}>
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
  );
}

export default App;
