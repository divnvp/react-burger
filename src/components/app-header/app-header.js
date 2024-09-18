import appHeaderStyle from "./app-header.module.css";
import HeaderItem from "../header-item/header-item";
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
  return (
    <div className={appHeaderStyle.navigationPanel}>
        <div className={appHeaderStyle.itemGroup}>
            <HeaderItem title="Конструктор">
                <BurgerIcon type="primary" />
            </HeaderItem>
            <HeaderItem title="Лента заказов">
                <ListIcon type="primary" />
            </HeaderItem>
        </div>
        <Logo />
        <HeaderItem title="Личный кабинет">
            <ProfileIcon type="primary" />
        </HeaderItem>
    </div>
  )
}

export default AppHeader
