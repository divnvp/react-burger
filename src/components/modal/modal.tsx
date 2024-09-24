import modalStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useState } from 'react';
import { Key } from '../../shared/consts/key.enum';
import { BrowserActions } from '../../shared/consts/browser-actions.enum';
import { MODAL_OVERLAY_ID } from '../../shared/consts/elements-ids';
import { createPortal } from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';

type Props = {
  title: string;
  isOpen: boolean;
  onClick: () => void;
  children?: React.ReactNode;
};

type EventKey = {
  key: string;
};

function Modal(props: Props) {
  const [portal, setPortal] = useState<HTMLElement | null>(null);

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

  useEffect(() => {
    const modalOverlay = document.getElementById(MODAL_OVERLAY_ID);
    setPortal(modalOverlay);

    return () => {
      setPortal(null);
    };
  }, [props.isOpen]);

  return (
    <>
      {props.isOpen && (
        <>
          <ModalOverlay />
          {portal &&
            createPortal(
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
              </>,
              portal
            )}
        </>
      )}
    </>
  );
}

export default Modal;
