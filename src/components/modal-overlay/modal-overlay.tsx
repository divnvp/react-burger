import modalOverlayStyles from './modal-overlay.module.css';
import { MODAL_OVERLAY_ID } from '../../shared/consts/elements-ids';
import React from 'react';

type Props = {
  onClick: () => void;
};

function ModalOverlay(props: Props) {
  return (
    <div
      className={`${modalOverlayStyles.modalOverlay}`}
      onClick={props.onClick}
    >
      <div
        id={MODAL_OVERLAY_ID}
        className={`${modalOverlayStyles.modalCard} pt-10 pb-15 pr-10 pl-10`}
        onClick={e => e.stopPropagation()}
      ></div>
    </div>
  );
}

export default ModalOverlay;
