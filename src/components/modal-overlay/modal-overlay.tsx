import modalOverlayStyles from './modal-overlay.module.css';
import { MODAL_OVERLAY_ID } from '../../shared/consts/elements-ids';
import { createPortal } from 'react-dom';
import Modal from '../modal/modal';
import React, { useEffect, useState } from 'react';

type Props = {
  isOpen: boolean;
  title: string;
  onClick: () => void;
  children?: React.ReactNode;
};

function ModalOverlay(props: Props) {
  const [portal, setPortal] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const modalOverlay = document.getElementById(MODAL_OVERLAY_ID);
    setPortal(modalOverlay);
    console.log(props);

    return () => {
      setPortal(null);
    };
  }, []);

  return (
    <div
      id={MODAL_OVERLAY_ID}
      className={`${modalOverlayStyles.modalOverlay} pt-10 pb-15 pr-10 pl-10`}
    >
      {portal &&
        createPortal(
          <Modal title={props.title} onClick={props.onClick}>
            {props.children}
          </Modal>,
          portal
        )}
    </div>
  );
}

export default ModalOverlay;
