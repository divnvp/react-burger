import { Layout } from '../../components/layout/layout';
import resetPasswordStyles from './reset-password.module.css';
import React, { useEffect } from 'react';
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
import { Response } from '../../shared/models/response.type';

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const resettingPassword = useSelector(
    (state: { resetPassword: { response: Response } }) => {
      return state.resetPassword.response;
    }
  );
  const [newPassword, setNewPassword] = React.useState('');
  const [code, setCode] = React.useState('');

  const resetPassword = () => {
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
      <div className={resetPasswordStyles.grid}>
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
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </div>
        <Button
          htmlType='button'
          type='primary'
          size='medium'
          onClick={resetPassword}
        >
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
      </div>
    </Layout>
  );
}
