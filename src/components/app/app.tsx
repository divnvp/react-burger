import React, { useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header';
import appStyles from './app.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { getData } from '../../shared/api/data.service';
import { Ingredient } from '../../shared/models/data.type';

function App() {
  const [data, setData] = useState<Ingredient[]>([]);
  const [cart, setCart] = useState<Ingredient[]>([]);
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

  const addToCart = (element: Ingredient) => {
    setCart(oldCart => [...oldCart, element]);
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
              <BurgerIngredients data={data} onClick={addToCart} />
            </div>
            <div>
              <BurgerConstructor data={data} cart={cart} />
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
