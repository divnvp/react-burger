import {
  Button,
  EmailInput,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { Link } from 'react-router-dom';
import loginStyles from './login.module.css';

export function LoginPage() {
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');
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

  return (
    <div className={loginStyles.grid}>
      <p className='text text_type_main-medium pb-6'>Вход</p>
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
      <Button htmlType='button' type='primary' size='medium'>
        Войти
      </Button>

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
  );
}
