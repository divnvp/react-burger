import registerStyles from './register.module.css';
import React from 'react';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { Layout } from '../../components/layout/layout';

export function RegisterPage() {
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
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
        <Button htmlType='button' type='primary' size='medium'>
          Зарегистрироваться
        </Button>

        <div className={`${registerStyles.textRow} pb-4 pt-20`}>
          <p className='text text_type_main-default text_color_inactive'>
            Уже зарегистрированы?
          </p>
          <Link to='/login' className='text text_type_main-default'>
            <p>Войти</p>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
