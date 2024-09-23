import modalStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';

type Props = {
  title: string;
  onClick: () => void;
  children?: React.ReactNode;
};

function Modal(props: Props) {
  return (
    <>
      <div className={modalStyles.header}>
        <p className='text text_type_main-medium'>{props.title}</p>
        <CloseIcon
          type='primary'
          onClick={() => props.onClick()}
          className={modalStyles.closeButton}
        />
      </div>

      <div>{props.children}</div>
    </>
  );
}

export default Modal;
