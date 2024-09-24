import modalOverlayStyles from './modal-overlay.module.css';
import { MODAL_OVERLAY_ID } from '../../shared/consts/elements-ids';
import React from 'react';

function ModalOverlay() {
  return (
    <div
      id={MODAL_OVERLAY_ID}
      className={`${modalOverlayStyles.modalOverlay} pt-10 pb-15 pr-10 pl-10`}
    ></div>
  );
}

export default ModalOverlay;
