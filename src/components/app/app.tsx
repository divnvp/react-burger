import React from 'react';
import AppHeader from "../app-header/app-header";
import appStyles from './app.module.css'
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

function App() {
  return (
    <div className={`text text_type_main-default ${appStyles.app}`}>
      <AppHeader />
      <div className={appStyles.parent}>
        <BurgerIngredients />
      </div>
    </div>
  );
}

export default App;
