import registerStyles from './register.module.css';
import React, { useEffect } from 'react';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '../../components/layout/layout';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegisterThunk } from '../../services/actions/registration';
import { UnknownAction } from 'redux';
import { Routes as RouteName } from '../../shared/consts/routes';
import { Response } from '../../shared/models/response.type';

export function RegisterPage() {
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onChangeLogin = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setLogin(e.target.value);
  };
  const onChangePassword = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassword(e.target.value);
  };
  const registration = useSelector(
    (state: { registration: { response: Response } }) => {
      return state.registration.response;
    }
  );

  const registerUser = () => {
    dispatch(
      fetchRegisterThunk({
        email: login,
        password,
        name
      }) as unknown as UnknownAction
    );
  };

  useEffect(() => {
    if (registration.success) {
      navigate(RouteName.Main);
    }
  }, [registration]);

  return (
    <Layout>
      <div className={registerStyles.grid}>
        <p className='text text_type_main-medium pb-6'>Регистрация</p>
        <div className='pb-6'>
          <Input
            type='text'
            placeholder='Имя'
            onChange={e => setName(e.target.value)}
            value={name}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass='ml-1'
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </div>
        <div className='pb-6'>
          <EmailInput
            onChange={onChangeLogin}
            value={login}
            name={'email'}
            isIcon={false}
          />
        </div>
        <div className='pb-6'>
          <PasswordInput
            onChange={onChangePassword}
            value={password}
            name={'password'}
          />
        </div>
        <Button
          htmlType='button'
          type='primary'
          size='medium'
          onClick={registerUser}
        >
          Зарегистрироваться
        </Button>

        <div className={`${registerStyles.textRow} pb-4 pt-20`}>
          <p className='text text_type_main-default text_color_inactive'>
            Уже зарегистрированы?
          </p>
          <Link to={RouteName.Login} className='text text_type_main-default'>
            <p>Войти</p>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
