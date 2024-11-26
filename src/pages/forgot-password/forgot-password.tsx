import { Layout } from '../../components/layout/layout';
import forgotPasswordStyles from './forgot-password.module.css';
import {
  Button,
  Input
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FormEvent, useEffect } from 'react';
import registerStyles from '../register/register.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { fetchForgotPasswordThunk } from '../../services/actions/forgot-password';
import { Routes } from '../../shared/consts/routes';
import { useForm } from '../../shared/hooks/use-form';
import { useDispatch, useSelector } from '../../shared/hooks/store';
import { AppThunkAction } from '../../services/types';

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const response = useSelector(state => state.forgotPassword.response);
  const [values, handleChange] = useForm<Required<{ email: string }>>({
    email: ''
  });

  const recoverPassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      fetchForgotPasswordThunk(values.email) as unknown as AppThunkAction
    );
  };

  useEffect(() => {
    if (response.success) {
      navigate(Routes.ResetPassword);
    }
  }, [response]);

  return (
    <Layout>
      <form className={forgotPasswordStyles.grid} onSubmit={recoverPassword}>
        <p className='text text_type_main-medium pb-6'>Восстановление пароля</p>

        <div className='pb-6'>
          <Input
            type='text'
            placeholder='Укажите e-mail'
            onChange={handleChange}
            value={values.email}
            name={'email'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass='ml-1'
            autoComplete='email'
            onPointerEnterCapture={() => ({})}
            onPointerLeaveCapture={() => ({})}
          />
        </div>
        <Button htmlType='submit' type='primary' size='medium'>
          Восстановить
        </Button>

        <div className={`${registerStyles.textRow} pb-4 pt-20`}>
          <p className='text text_type_main-default text_color_inactive'>
            Вспомнили пароль?
          </p>
          <Link to='/login' className='text text_type_main-default'>
            <p>Войти</p>
          </Link>
        </div>
      </form>
    </Layout>
  );
}
