import { Layout } from '../../components/layout/layout';
import resetPasswordStyles from './reset-password.module.css';
import React, { FormEvent, useEffect } from 'react';
import {
  Button,
  Input,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import registerStyles from '../register/register.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { fetchResetPasswordThunk } from '../../services/actions/reset-password';
import { Routes as RoutesName } from '../../shared/consts/routes';
import { useForm } from '../../shared/hooks/use-form';
import { ResetPassword } from '../../shared/models/reset-password.type';
import { useDispatch, useSelector } from '../../shared/hooks/store';

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const resettingPassword = useSelector(state => state.resetPassword.response);
  const [values, handleChange] = useForm<Required<ResetPassword>>({
    password: '',
    token: ''
  });

  const resetPassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      fetchResetPasswordThunk({
        ...values
      })
    );
  };

  useEffect(() => {
    if (resettingPassword.success) {
      navigate(RoutesName.Login);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resettingPassword]);

  return (
    <Layout>
      <form className={resetPasswordStyles.grid} onSubmit={resetPassword}>
        <p className='text text_type_main-medium pb-6'>Восстановление пароля</p>

        <div className='pb-6'>
          <PasswordInput
            placeholder='Введите новый пароль'
            onChange={handleChange}
            value={values.password}
            name={'password'}
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
            onChange={handleChange}
            value={values.token}
            name={'token'}
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
