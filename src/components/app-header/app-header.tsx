import appHeaderStyle from './app-header.module.css';
import HeaderItem from '../header-item/header-item';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { Routes as RouteName } from '../../shared/consts/routes';

function AppHeader() {
  return (
    <header className={`pt-4 pb-4 ${appHeaderStyle.navigationPanel}`}>
      <nav className={appHeaderStyle.grid}>
        <div className={appHeaderStyle.itemGroup}>
          <HeaderItem title='Конструктор' isActive={true}>
            <BurgerIcon type='primary' />
          </HeaderItem>
          <HeaderItem title='Лента заказов' isActive={false}>
            <ListIcon type='secondary' />
          </HeaderItem>
        </div>
        <Logo />
        <Link to={RouteName.Profile}>
          <HeaderItem title='Личный кабинет' isActive={false}>
            <ProfileIcon type='secondary' />
          </HeaderItem>
        </Link>
      </nav>
    </header>
  );
}

export default AppHeader;
