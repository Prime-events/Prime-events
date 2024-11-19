import React from 'react'
import styles from './modal.module.css'
import ReactDom from 'react-dom'

function Modal({ open, children, onClose }) {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
    <div className={styles.overlayModal}/>
    <div className={styles.containerModal}>
      <div className={styles.botaoFecharStyle}>
        <span className={styles.botaoFechar} onClick={onClose}>X</span>
      </div>
      {children}
    </div>
    </>,
    document.getElementById('portal')
  )
}

export default Modal