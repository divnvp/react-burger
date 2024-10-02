import React, { useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header';
import appStyles from './app.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { getData } from '../../shared/api/data.service';
import { useDispatch } from 'react-redux';
import { INGREDIENTS_GETTING } from '../../services/actions/burger-ingredients';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

function App() {
  const dispatch = useDispatch();
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getData().then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      });
      dispatch({
        type: INGREDIENTS_GETTING,
        payload: data
      });
    } catch (e) {
      setError((e as { message?: string })?.message ?? '');
    }
  };

  return (
    <div className={`text text_type_main-default ${appStyles.app}`}>
      <AppHeader />
      <main className={appStyles.parent}>
        {error ? (
          <h1>{error}</h1>
        ) : (
          <>
            <div>
              <BurgerIngredients />
            </div>
            <div>
              <DndProvider backend={HTML5Backend}>
                <BurgerConstructor />
              </DndProvider>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
