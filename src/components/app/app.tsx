import React, { useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header';
import appStyles from './app.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { getData } from '../../shared/api/data.service';
import { Ingredient } from '../../shared/models/ingredient.type';

function App() {
  const [data, setData] = useState<Ingredient[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getData().then(res => res.json());
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
              <BurgerIngredients data={data} />
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
