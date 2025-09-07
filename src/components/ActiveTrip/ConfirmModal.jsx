// src/components/shared/ConfirmModal/ConfirmModal.jsx
// Reusable confirmation modal with focus trap and keyboard support

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle } from 'lucide-react';
import { modal } from './variants';
import styles from './ConfirmModal.module.css';

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'default' // 'default' | 'danger'
}) => {
  const modalRef = useRef(null);
  const firstFocusableRef = useRef(null);
  const lastFocusableRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Focus first focusable element when modal opens
      setTimeout(() => {
        firstFocusableRef.current?.focus();
      }, 100);

      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isOpen) return;

      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'Tab') {
        // Focus trap
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.backdrop}
          variants={modal}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <div 
            ref={modalRef}
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.header}>
              <div className={styles.titleSection}>
                {variant === 'danger' && (
                  <div className={styles.warningIcon}>
                    <AlertTriangle size={20} />
                  </div>
                )}
                <h2 id="modal-title" className={styles.title}>
                  {title}
                </h2>
              </div>
              <button
                onClick={onClose}
                className={styles.closeButton}
                aria-label="Close modal"
                type="button"
              >
                <X size={18} />
              </button>
            </div>

            <div className={styles.content}>
              <p id="modal-description" className={styles.message}>
                {message}
              </p>
            </div>

            <div className={styles.actions}>
              <button
                ref={firstFocusableRef}
                onClick={onClose}
                className={`${styles.actionButton} ${styles.secondary}`}
                type="button"
              >
                {cancelLabel}
              </button>
              <button
                ref={lastFocusableRef}
                onClick={handleConfirm}
                className={`${styles.actionButton} ${variant === 'danger' ? styles.danger : styles.primary}`}
                type="button"
              >
                {confirmLabel}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;