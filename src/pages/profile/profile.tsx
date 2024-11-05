import profileStyles from './profile.module.css';
import {
  Button,
  Input,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { Layout } from '../../components/layout/layout';
import { useDispatch, useSelector } from 'react-redux';
import { RegisterUser } from '../../shared/models/register-user.type';
import {
  fetchUserThunk,
  fetchUserUpdatingThunk
} from '../../services/actions/user';
import { UnknownAction } from 'redux';
import { fetchLogoutThunk } from '../../services/actions/login';
import { useNavigate } from 'react-router-dom';
import { Routes as RouteName } from '../../shared/consts/routes';
import { Logout } from '../../shared/models/store/logout.type';
import { useForm } from '../../shared/hooks/use-form';

type ProfileSelector = {
  user: RegisterUser;
  login: Logout;
};

export function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const useProfilePageSelector = useSelector.withTypes<ProfileSelector>();
  const user = useProfilePageSelector(state => state.user);
  const logout = useProfilePageSelector(state => state.login.logout);
  const [values, handleChange, setCertainValue] = useForm<
    Required<RegisterUser>
  >({
    email: '',
    password: '',
    name: ''
  });
  const [showButtons, setShowButtons] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const loginRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user && Object.keys(user).length) {
      if (user?.name) {
        setCertainValue('name', user.name);
      }
      setCertainValue('email', user.email);
    }
  }, [user]);

  useEffect(() => {
    dispatch(fetchUserThunk() as unknown as UnknownAction);
  }, []);

  useEffect(() => {
    if (
      user.name !== nameRef.current?.value ||
      user.email !== loginRef.current?.value ||
      values.password.length
    ) {
      setShowButtons(true);
    } else {
      setShowButtons(false);
    }
  }, [user, nameRef.current?.value, loginRef.current?.value, values.password]);

  const onLogout = () => {
    dispatch(fetchLogoutThunk() as unknown as UnknownAction);
  };

  useEffect(() => {
    if (logout?.success) {
      navigate(RouteName.Login, { replace: true });
    }
  }, [logout]);

  const onSaveProfile = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      fetchUserUpdatingThunk({
        ...values
      }) as unknown as UnknownAction
    );
  };

  const onCancelEdit = () => {
    setCertainValue('name', user.name);
    setCertainValue('email', user.email);
    setShowButtons(false);
  };

  return (
    <Layout>
      <div className={`${profileStyles.grid} pt-30`}>
        <div className={`${profileStyles.col} ${profileStyles.textWidth}`}>
          <p className='text text_type_main-large pb-6'>Профиль</p>
          <p className='text text_type_main-large text_color_inactive pb-6'>
            История заказов
          </p>
          <div className={profileStyles.logoutButton}>
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

        <form className='pl-15' onSubmit={onSaveProfile}>
          <div className={profileStyles.col}>
            <div className='pb-6'>
              <Input
                ref={nameRef}
                type='text'
                placeholder='Имя'
                onChange={handleChange}
                value={values.name}
                name={'name'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass='ml-1'
                icon='EditIcon'
                autoComplete='name'
                onPointerEnterCapture={() => ({})}
                onPointerLeaveCapture={() => ({})}
              />
            </div>
            <div className='pb-6'>
              <Input
                ref={loginRef}
                type='text'
                placeholder='Логин'
                onChange={handleChange}
                value={values.email}
                name={'login'}
                error={false}
                icon='EditIcon'
                errorText={'Ошибка'}
                size={'default'}
                extraClass='ml-1'
                autoComplete='email'
                onPointerEnterCapture={() => ({})}
                onPointerLeaveCapture={() => ({})}
              />
            </div>
            <PasswordInput
              placeholder='Пароль'
              onChange={handleChange}
              value={values.password}
              name={'password'}
              icon='EditIcon'
              errorText={'Ошибка'}
              size={'default'}
              extraClass='ml-1'
              autoComplete='current-password'
            />
          </div>

          {showButtons ? (
            <div className={`${profileStyles.saveButton} pt-10`}>
              <Button
                htmlType='button'
                type='secondary'
                size='medium'
                onClick={onCancelEdit}
              >
                Отмена
              </Button>
              <Button htmlType='submit' type='primary' size='medium'>
                Сохранить
              </Button>
            </div>
          ) : null}
        </form>
      </div>
    </Layout>
  );
}
