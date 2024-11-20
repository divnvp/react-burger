import profileStyles from './profile.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/layout/layout';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserThunk } from '../../services/actions/user';
import { UnknownAction } from 'redux';
import { fetchLogoutThunk } from '../../services/actions/login';
import { useNavigate } from 'react-router-dom';
import { Routes as RouteName } from '../../shared/consts/routes';
import { FeedCardImage } from '../../components/feed-card-image/feed-card-image';
import { ProfileForm } from '../../components/profile-form/profile-form';
import { Logout } from '../../shared/models/store/logout.type';

enum Parts {
  Profile = 'profile',
  History = 'history'
}

type ProfileSelector = {
  login: Logout;
};

export function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const useProfilePageSelector = useSelector.withTypes<ProfileSelector>();
  const logout = useProfilePageSelector(state => state.login.logout);
  const [currentPart, setCurrentPart] = useState<Parts>(Parts.Profile);

  useEffect(() => {
    dispatch(fetchUserThunk() as unknown as UnknownAction);
  }, []);

  const onLogout = () => {
    dispatch(fetchLogoutThunk() as unknown as UnknownAction);
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
              onClick={() => setCurrentPart(Parts.Profile)}
            >
              <p className='text text_type_main-large pb-6'>Профиль</p>
            </Button>
          </div>
          <div className={profileStyles.button}>
            <Button
              htmlType='button'
              type='secondary'
              size='medium'
              onClick={() => setCurrentPart(Parts.History)}
            >
              <p className='text text_type_main-large pb-6'>История заказов</p>
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

        {currentPart === Parts.Profile ? (
          <ProfileForm />
        ) : (
          <FeedCardImage index={1} />
        )}
      </div>
    </Layout>
  );
}
