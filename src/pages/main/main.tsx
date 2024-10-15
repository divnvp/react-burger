import mainStyles from './main.module.css';
import AppHeader from '../../components/app-header/app-header';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import React from 'react';
import { NotFoundPage } from '../not-found-page/not-found-page';

export function MainPage() {
  return (
    <div className={`text text_type_main-default ${mainStyles.app}`}>
      <AppHeader />
      <main className={mainStyles.parent}>
        <NotFoundPage />
        <DndProvider backend={HTML5Backend}>
          <div>
            <BurgerIngredients />
          </div>
          <div>
            <BurgerConstructor />
          </div>
        </DndProvider>
        )
      </main>
    </div>
  );
}
