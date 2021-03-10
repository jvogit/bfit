import React, { useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  SIZE,
  ROLE
} from "baseui/modal";
import { Button } from "baseui/button";
import { Link } from "react-router-dom";
import LoginForm from "components/forms/LoginForm";

export default ({ isOpen, onClose, onSuccess, onClickSignup }) => {
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
        <h1>Login</h1>
      </ModalHeader>
      <ModalBody>
        <LoginForm onSuccess={onSuccess} />
        <Button onClick={onClickSignup}
          overrides={{
            BaseButton: {
              style: {
                width: '100%'
              }
            }
          }}
        >
          Sign up
        </Button>
      </ModalBody>
    </Modal>
  );
}