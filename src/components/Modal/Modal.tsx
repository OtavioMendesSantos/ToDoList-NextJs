"use client";
import React from 'react'
import styles from './Modal.module.scss'

interface ModalProps {
  onClose?: () => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const Modal = ({ onClose, children, style }: ModalProps) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose && onClose()
    }
  }

  return (
    <div className={styles.modalContainer} style={style} onClick={handleClick} >
      <div className={styles.modal}>
        {children}
      </div>
    </div>
  )
}

export default Modal