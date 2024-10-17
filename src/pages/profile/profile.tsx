import profileStyles from './profile.module.css';
import {
  Input,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect } from 'react';
import { Layout } from '../../components/layout/layout';
import { useSelector } from 'react-redux';
import { RegisterUser } from '../../shared/models/register-user.type';

export function ProfilePage() {
  const user = useSelector((state: unknown) => {
    return (state as { user: { user: RegisterUser } }).user.user;
  });
  const [name, setName] = React.useState('');
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');

  useEffect(() => {
    console.log(user);
    if (user && Object.keys(user).length) {
      setName(user.name);
      setLogin(user.email);
      setPassword(user.password);
    }
  }, [user]);

  return (
    <Layout>
      <div className={`${profileStyles.grid} pt-30`}>
        <div className={`${profileStyles.col} ${profileStyles.textWidth}`}>
          <p className='text text_type_main-large pb-6'>Профиль</p>
          <p className='text text_type_main-large text_color_inactive pb-6'>
            История заказов
          </p>
          <p className='text text_type_main-large text_color_inactive pb-20'>
            Выход
          </p>
          <p className={`text text_type_main-default text_color_inactive`}>
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>

        <div className='pl-15'>
          <div className={profileStyles.col}>
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
                icon='EditIcon'
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
            </div>
            <div className='pb-6'>
              <Input
                type='text'
                placeholder='Логин'
                onChange={e => setLogin(e.target.value)}
                value={login}
                name={'login'}
                error={false}
                icon='EditIcon'
                errorText={'Ошибка'}
                size={'default'}
                extraClass='ml-1'
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
            </div>
            <PasswordInput
              placeholder='Пароль'
              onChange={e => setPassword(e.target.value)}
              value={password}
              name={'password'}
              icon='EditIcon'
              errorText={'Ошибка'}
              size={'default'}
              extraClass='ml-1'
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
