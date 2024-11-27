import profileStyles from './profile.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect } from 'react';
import { Layout } from '../../components/layout/layout';
import { fetchUserThunk } from '../../services/actions/user';
import { fetchLogoutThunk } from '../../services/actions/login';
import { Outlet, useNavigate } from 'react-router-dom';
import { Routes as RouteName } from '../../shared/consts/routes';
import { useDispatch, useSelector } from '../../shared/hooks/store';

export function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = useSelector(state => state.login.logout);

  useEffect(() => {
    dispatch(fetchUserThunk());
  }, []);

  const onLogout = () => {
    dispatch(fetchLogoutThunk());
  };

  useEffect(() => {
    if (logout?.success) {
      navigate(RouteName.Login, { replace: true });
    }
  }, [logout]);

  return (
    <Layout>
      <div className={`${profileStyles.grid} pt-30`}>
        <div className={`${profileStyles.col} ${profileStyles.textWidth}`}>
          <div className={profileStyles.button}>
            <Button
              htmlType='button'
              type='secondary'
              size='medium'
              onClick={() => navigate(RouteName.Profile)}
            >
              <p className='text text_type_main-large pb-6'>Профиль</p>
            </Button>
          </div>
          <div className={profileStyles.button}>
            <Button
              htmlType='button'
              type='secondary'
              size='medium'
              onClick={() => navigate(`${RouteName.ProfileOrders}`)}
            >
              <p
                className='text text_type_main-large pb-6'
                style={{ textAlign: 'start' }}
              >
                История заказов
              </p>
            </Button>
          </div>
          <div className={profileStyles.button}>
            <Button
              htmlType='button'
              type='secondary'
              size='medium'
              onClick={onLogout}
            >
              <div className='text text_type_main-large text_color_inactive pb-20'>
                Выход
              </div>
            </Button>
            <p className={`text text_type_main-default text_color_inactive`}>
              В этом разделе вы можете изменить свои персональные данные
            </p>
          </div>
        </div>
        <Outlet />
      </div>
    </Layout>
  );
}
