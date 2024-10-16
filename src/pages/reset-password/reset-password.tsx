import { Layout } from '../../components/layout/layout';
import resetPasswordStyles from './reset-password.module.css';
import React from 'react';
import {
  Button,
  Input,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import registerStyles from '../register/register.module.css';
import { Link } from 'react-router-dom';

export function ResetPasswordPage() {
  const [newPassword, setNewPassword] = React.useState('');
  const [code, setCode] = React.useState('');

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
        <Button htmlType='button' type='primary' size='medium'>
          Сохранить
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
