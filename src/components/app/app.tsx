import React from 'react';
import AppHeader from "../app-header/app-header";
import appStyles from './app.module.css'
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function App() {
  return (
    <div className={`text text_type_main-default ${appStyles.app}`}>
      <AppHeader />
      <div className={appStyles.parent}>
        <div>
          <BurgerIngredients />
        </div>
        <div>
          <BurgerConstructor />
        </div>
      </div>
    </div>
  );
}

export default App;
