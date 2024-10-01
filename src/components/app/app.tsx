import React, { useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header';
import appStyles from './app.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { getData } from '../../shared/api/data.service';
import { Ingredient } from '../../shared/models/ingredient.type';
import { useDispatch } from 'react-redux';
import { INGREDIENTS_GETTING } from '../../services/actions/burger-ingredients';

function App() {
  const dispatch = useDispatch();
  const [data, setData] = useState<Ingredient[]>([]);
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
      setData(data.data);
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
              <BurgerConstructor data={data} />
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
