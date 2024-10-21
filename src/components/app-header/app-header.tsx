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
          <Link to={RouteName.Main} className={`${appHeaderStyle.link}`}>
            <HeaderItem title='Конструктор' isActive={false}>
              <BurgerIcon type='primary' />
            </HeaderItem>
          </Link>

          <HeaderItem title='Лента заказов' isActive={false}>
            <ListIcon type='secondary' />
          </HeaderItem>
        </div>
        <Logo />
        <Link to={RouteName.Profile} className={`${appHeaderStyle.link}`}>
          <HeaderItem title='Личный кабинет' isActive={false}>
            <ProfileIcon type='secondary' />
          </HeaderItem>
        </Link>
      </nav>
    </header>
  );
}

export default AppHeader;
