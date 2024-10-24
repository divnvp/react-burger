import profileStyles from './profile.module.css';
import {
  Button,
  Input,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useRef } from 'react';
import { Layout } from '../../components/layout/layout';
import { useDispatch, useSelector } from 'react-redux';
import { RegisterUser } from '../../shared/models/register-user.type';
import {
  fetchUserThunk,
  fetchUserUpdatingThunk
} from '../../services/actions/user';
import { UnknownAction } from 'redux';
import { fetchLogoutThunk } from '../../services/actions/login';
import { Response } from '../../shared/models/response.type';
import { useNavigate } from 'react-router-dom';
import { Routes as RouteName } from '../../shared/consts/routes';

export function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: unknown) => {
    return (state as { user: RegisterUser }).user;
  });
  const logout = useSelector((state: unknown) => {
    return (state as { login: { logout: Response } }).login.logout;
  });
  const [name, setName] = React.useState('');
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showButtons, setShowButtons] = React.useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const loginRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user && Object.keys(user).length) {
      if (user?.name) {
        setName(user.name);
      }
      setLogin(user.email);
    }
  }, [user]);

  useEffect(() => {
    dispatch(fetchUserThunk() as unknown as UnknownAction);
  }, []);

  useEffect(() => {
    if (
      user.name !== nameRef.current?.value ||
      user.email !== loginRef.current?.value ||
      password.length
    ) {
      setShowButtons(true);
    } else {
      setShowButtons(false);
    }
  }, [user, nameRef.current?.value, loginRef.current?.value, password]);

  const onLogout = () => {
    dispatch(fetchLogoutThunk() as unknown as UnknownAction);
  };

  useEffect(() => {
    if (logout?.success) {
      navigate(RouteName.Login, { replace: true });
    }
  }, [logout]);

  const onSaveProfile = () => {
    dispatch(
      fetchUserUpdatingThunk({
        email: login,
        password,
        name
      }) as unknown as UnknownAction
    );
  };

  const onCancelEdit = () => {
    setName(user?.name as string);
    setLogin(user.email);
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
                onChange={e => setName(e.target.value)}
                value={name}
                name={'name'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass='ml-1'
                icon='EditIcon'
                onPointerEnterCapture={() => ({})}
                onPointerLeaveCapture={() => ({})}
              />
            </div>
            <div className='pb-6'>
              <Input
                ref={loginRef}
                type='text'
                placeholder='Логин'
                onChange={e => setLogin(e.target.value)}
                value={login}
                name={'login'}
                error={false}
                icon='EditIcon'
                errorText={'Ошибка'}
                size={'default'}
                extraClass='ml-1'
                onPointerEnterCapture={() => ({})}
                onPointerLeaveCapture={() => ({})}
              />
            </div>
            <PasswordInput
              placeholder='Пароль'
              onChange={e => setPassword(e.target.value)}
              value={password}
              name={'password'}
              icon='EditIcon'
              errorText={'Ошибка'}
              size={'default'}
              extraClass='ml-1'
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
