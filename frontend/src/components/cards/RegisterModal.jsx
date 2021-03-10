import React, { useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE
} from "baseui/modal";
import RegisterForm from "components/forms/RegisterForm";

export default ({isOpen, onClose, onSuccess}) => {
  return (
    <Modal
      onClose={onClose}
      closeable
      isOpen={isOpen}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
    >
      <ModalHeader>
        <h1>Register</h1>
      </ModalHeader>
      <ModalBody>
        <RegisterForm onSuccess={onSuccess}/>
      </ModalBody>
    </Modal>
  );
}