import modalStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect } from 'react';
import { Key } from '../../shared/consts/key.enum';
import { BrowserActions } from '../../shared/consts/browser-actions.enum';

type Props = {
  title: string;
  onClick: () => void;
  children?: React.ReactNode;
};

type EventKey = {
  key: string;
};

function Modal(props: Props) {
  useEffect(() => {
    const closeOnEsc = (event: EventKey) => {
      if (event.key === Key.Esc) {
        props.onClick();
      }
    };
    window.addEventListener(BrowserActions.Keydown, closeOnEsc);

    return () => {
      window.removeEventListener(BrowserActions.Keydown, closeOnEsc);
    };
  }, []);

  return (
    <>
      <div className={modalStyles.header}>
        <p className='text text_type_main-large'>{props.title}</p>
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
