import { Layout } from '../../components/layout/layout';
import resetPasswordStyles from './reset-password.module.css';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Input,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import registerStyles from '../register/register.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResetPasswordThunk } from '../../services/actions/reset-password';
import { UnknownAction } from 'redux';
import { Routes as RoutesName } from '../../shared/consts/routes';
import { ResponseState } from '../../shared/models/store/response.type';

type ResetPasswordSelector = {
  resetPassword: ResponseState;
};

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const useResetPasswordSelector =
    useSelector.withTypes<ResetPasswordSelector>();
  const resettingPassword = useResetPasswordSelector(
    state => state.resetPassword.response
  );
  const [newPassword, setNewPassword] = useState('');
  const [code, setCode] = useState('');

  const resetPassword = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(
      fetchResetPasswordThunk({
        password: newPassword,
        token: code
      }) as unknown as UnknownAction
    );
  };

  useEffect(() => {
    if (resettingPassword.success) {
      navigate(RoutesName.Login);
    }
  }, [resettingPassword]);

  return (
    <Layout>
      <form className={resetPasswordStyles.grid} onSubmit={resetPassword}>
        <p className='text text_type_main-medium pb-6'>Восстановление пароля</p>

        <div className='pb-6'>
          <PasswordInput
            placeholder='Введите новый пароль'
            onChange={e => setNewPassword(e.target.value)}
            value={newPassword}
            name={'name'}
            errorText={'Ошибка'}
            size={'default'}
            extraClass='ml-1'
            autoComplete='new-password'
          />
        </div>
        <div className='pb-6'>
          <Input
            type='text'
            placeholder='Введите код из письма'
            onChange={e => setCode(e.target.value)}
            value={code}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass='ml-1'
            autoComplete='one-time-code'
            onPointerEnterCapture={() => ({})}
            onPointerLeaveCapture={() => ({})}
          />
        </div>
        <Button htmlType='submit' type='primary' size='medium'>
          Сохранить
        </Button>

        <div className={`${registerStyles.textRow} pb-4 pt-20`}>
          <p className='text text_type_main-default text_color_inactive'>
            Вспомнили пароль?
          </p>
          <Link to={RoutesName.Login} className='text text_type_main-default'>
            <p>Войти</p>
          </Link>
        </div>
      </form>
    </Layout>
  );
}
