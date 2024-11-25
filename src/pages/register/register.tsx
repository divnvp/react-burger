import registerStyles from './register.module.css';
import React, { FormEvent, useEffect } from 'react';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '../../components/layout/layout';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegisterThunk } from '../../services/actions/registration';
import { UnknownAction } from 'redux';
import { Routes as RouteName } from '../../shared/consts/routes';
import { ResponseState } from '../../shared/models/store/response.type';
import { useForm } from '../../shared/hooks/use-form';
import { RegisterUser } from '../../shared/models/register-user.type';

type RegisterPageSelector = {
  registration: ResponseState;
};

export function RegisterPage() {
  const [values, handleChange] = useForm<Required<RegisterUser>>({
    email: '',
    password: '',
    name: ''
  });
  const dispatch = useDispatch();
  const useRegisterPageSelector = useSelector.withTypes<RegisterPageSelector>();
  const navigate = useNavigate();
  const registration = useRegisterPageSelector(state => state.registration);

  const registerUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      fetchRegisterThunk({
        ...values
      }) as unknown as UnknownAction
    );
  };

  useEffect(() => {
    if (registration?.response?.success) {
      navigate(RouteName.Login);
    }
  }, [registration]);

  return (
    <Layout>
      <form className={registerStyles.grid} onSubmit={registerUser}>
        <p className='text text_type_main-medium pb-6'>Регистрация</p>
        <div className='pb-6'>
          <Input
            type='text'
            placeholder='Имя'
            onChange={handleChange}
            value={values.name}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass='ml-1'
            autoComplete='name'
            onPointerEnterCapture={() => ({})}
            onPointerLeaveCapture={() => ({})}
          />
        </div>
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
            autoComplete='new-password'
          />
        </div>
        <Button htmlType='submit' type='primary' size='medium'>
          Зарегистрироваться
        </Button>

        <div className={`${registerStyles.textRow} pb-4 pt-20`}>
          <p className='text text_type_main-default text_color_inactive'>
            Уже зарегистрированы?
          </p>
          <Link to={RouteName.Login} className='text text_type_main-default'>
            <p>Войти</p>
          </Link>
        </div>
      </form>
    </Layout>
  );
}
