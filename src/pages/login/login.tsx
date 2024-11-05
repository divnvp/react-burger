import {
  Button,
  EmailInput,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import loginStyles from './login.module.css';
import { Layout } from '../../components/layout/layout';
import { useDispatch } from 'react-redux';
import { fetchLoginThunk } from '../../services/actions/login';
import { UnknownAction } from 'redux';
import { useForm } from '../../shared/hooks/use-form';
import { LoginUser } from '../../shared/models/login-user.type';

export function LoginPage() {
  const dispatch = useDispatch();
  const [values, handleChange] = useForm<LoginUser>({
    email: '',
    password: ''
  });

  const onAuth = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      fetchLoginThunk({
        ...values
      }) as unknown as UnknownAction
    );
  };

  return (
    <Layout>
      <form className={loginStyles.grid} onSubmit={onAuth}>
        <p className='text text_type_main-medium pb-6'>Вход</p>
        <div className='pb-6'>
          <EmailInput
            onChange={handleChange}
            value={values.email}
            name={'email'}
            isIcon={false}
            autoComplete='email'
          />
        </div>
        <div className='pb-6'>
          <PasswordInput
            onChange={handleChange}
            value={values.password}
            name={'password'}
            autoComplete='current-password'
          />
        </div>
        <Button htmlType='submit' type='primary' size='medium'>
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
      </form>
    </Layout>
  );
}
