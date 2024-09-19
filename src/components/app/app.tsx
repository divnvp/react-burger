import React, {useEffect, useState} from 'react';
import AppHeader from "../app-header/app-header";
import appStyles from './app.module.css'
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {getData} from "../../shared/api/data.service";
import {Data} from "../../shared/models/data.type";

function App() {
  const [data, setData] = useState<Data[]>([]);
  const [cart, setCart] = useState<Data[]>([])

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getData();
      setData(data);
    } catch (e) {
      console.log(e);
    }
  }

  const addToCart = (element: Data) => {
    setCart(oldCart => [...oldCart, element])
  }

  return (
    <div className={`text text_type_main-default ${appStyles.app}`}>
      <AppHeader />
      <div className={appStyles.parent}>
        <div>
          <BurgerIngredients data={data} onClick={addToCart} />
        </div>
        <div>
          <BurgerConstructor data={data} cart={cart} />
        </div>
      </div>
    </div>
  );
}

export default App;
