import React from 'react';
import AppHeader from "../app-header/app-header";
import appStyles from './app.module.css'

function App() {
  return (
    <div className={`text text_type_main-default mt-4 ${appStyles.app}`}>
      <AppHeader />
    </div>
  );
}

export default App;
