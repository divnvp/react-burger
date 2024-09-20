import appHeaderStyle from "./app-header.module.css";
import HeaderItem from "../header-item/header-item";
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
  return (
    <header className={`pt-4 pb-4 ${appHeaderStyle.navigationPanel}`}>
      <nav className={appHeaderStyle.grid}>
        <div className={appHeaderStyle.itemGroup}>
          <HeaderItem title="Конструктор" isActive={true}>
            <BurgerIcon type="primary" />
          </HeaderItem>
          <HeaderItem title="Лента заказов" isActive={false}>
            <ListIcon type="secondary" />
          </HeaderItem>
        </div>
        <Logo />
        <HeaderItem title="Личный кабинет" isActive={false}>
          <ProfileIcon type="secondary" />
        </HeaderItem>
      </nav>
    </header>
  )
}

export default AppHeader
