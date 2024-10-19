import {
  Button,
  EmailInput,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginStyles from './login.module.css';
import { Layout } from '../../components/layout/layout';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoginThunk } from '../../services/actions/login';
import { UnknownAction } from 'redux';
import { Response } from '../../shared/models/response.type';
import { Routes as RouteName } from '../../shared/consts/routes';
import { Navigate } from 'react-router';

export function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = React.useState('');
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');
  const auth = useSelector((state: unknown) => {
    return (state as { login: { checkingAuth: boolean } }).login.checkingAuth;
  });
  const loginState = useSelector((state: { login: Response }) => state?.login);

  const onAuth = () => {
    dispatch(
      fetchLoginThunk({
        email: login,
        password
      }) as unknown as UnknownAction
    );
  };

  useEffect(() => {
    if (loginState?.error?.length) {
      setError(loginState?.error);
    }

    if (loginState?.success) {
      navigate(RouteName.Main, { replace: true });
    }
  }, [loginState]);

  return (
    <Layout>
      <p>auth: {auth}</p>

      {auth ? (
        <Navigate to={RouteName.Main} />
      ) : (
        <div className={loginStyles.grid}>
          <p className='text text_type_main-medium pb-6'>Вход</p>
          <div className='pb-6'>
            <EmailInput
              onChange={e => setLogin(e.target.value)}
              value={login}
              name={'email'}
              isIcon={false}
            />
          </div>
          <div className='pb-6'>
            <PasswordInput
              onChange={e => setPassword(e.target.value)}
              value={password}
              name={'password'}
            />
          </div>
          <Button
            htmlType='button'
            type='primary'
            size='medium'
            onClick={onAuth}
          >
            Войти
          </Button>
          {error ? (
            <p className='text text_type_main-default text_color_inactive'>
              {error}
            </p>
          ) : null}

          <div className={`${loginStyles.textRow} pb-4 pt-20`}>
            <p className='text text_type_main-default text_color_inactive'>
              Вы — новый пользователь?
            </p>
            <Link to='/register' className='text text_type_main-default'>
              <p>Зарегистрироваться</p>
            </Link>
          </div>

          <div className={loginStyles.textRow}>
            <p className='text text_type_main-default text_color_inactive'>
              Забыли пароль?
            </p>
            <Link to='/forgot-password' className='text text_type_main-default'>
              <p>Восстановить пароль</p>
            </Link>
          </div>
        </div>
      )}
    </Layout>
  );
}
