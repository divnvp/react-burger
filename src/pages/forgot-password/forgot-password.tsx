import { Layout } from '../../components/layout/layout';
import forgotPasswordStyles from './forgot-password.module.css';
import {
  Button,
  Input
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useState } from 'react';
import registerStyles from '../register/register.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchForgotPasswordThunk } from '../../services/actions/forgot-password';
import { UnknownAction } from 'redux';
import { Response } from '../../shared/models/response.type';
import { Routes } from '../../shared/consts/routes';

type RegisterPageSelector = {
  forgotPassword: { response: Response };
};

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const useRegisterPageSelector = useSelector.withTypes<RegisterPageSelector>();
  const response = useRegisterPageSelector(
    state => state.forgotPassword.response
  );
  const [email, setEmail] = useState('');

  const recoverPassword = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(fetchForgotPasswordThunk(email) as unknown as UnknownAction);
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
            onChange={e => setEmail(e.target.value)}
            value={email}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass='ml-1'
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
