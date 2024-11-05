import appHeaderStyle from './app-header.module.css';
import HeaderItem from '../header-item/header-item';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import { Routes as RouteName } from '../../shared/consts/routes';
import { Navigate, useLocation } from 'react-router';
import { useEffect, useState } from 'react';

function AppHeader() {
  const location = useLocation();
  const [activeTabMain, setActiveTabMain] = useState(false);
  const [activeTabProfile, setActiveTabProfile] = useState(false);
  useEffect(() => {
    if (location.pathname === RouteName.Main) {
      setActiveTabMain(true);
    }
    if (location.pathname === RouteName.Profile) {
      setActiveTabProfile(true);
    }
  }, [location]);

  return (
    <header className={`pt-4 pb-4 ${appHeaderStyle.navigationPanel}`}>
      <nav className={appHeaderStyle.grid}>
        <div className={appHeaderStyle.itemGroup}>
          <NavLink to={RouteName.Main} className={`${appHeaderStyle.link}`}>
            <HeaderItem title='Конструктор' isActive={activeTabMain}>
              <BurgerIcon type='primary' />
            </HeaderItem>
          </NavLink>

          <HeaderItem title='Лента заказов' isActive={false}>
            <ListIcon type='secondary' />
          </HeaderItem>
        </div>
        <NavLink to={RouteName.Main}>
          <Logo />
        </NavLink>
        <NavLink to={RouteName.Profile} className={`${appHeaderStyle.link}`}>
          <HeaderItem title='Личный кабинет' isActive={activeTabProfile}>
            <ProfileIcon type='secondary' />
          </HeaderItem>
        </NavLink>
      </nav>
    </header>
  );
}

export default AppHeader;
