import { Layout } from '../../components/layout/layout';
import forgotPasswordStyles from './forgot-password.module.css';
import {
  Button,
  Input
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import registerStyles from '../register/register.module.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchForgotPasswordThunk } from '../../services/actions/forgot-password';
import { UnknownAction } from 'redux';

export function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState('');

  const recoverPassword = () => {
    dispatch(fetchForgotPasswordThunk('') as unknown as UnknownAction);
  };

  return (
    <Layout>
      <div className={forgotPasswordStyles.grid}>
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
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </div>
        <Button
          htmlType='button'
          type='primary'
          size='medium'
          onClick={recoverPassword}
        >
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
      </div>
    </Layout>
  );
}
