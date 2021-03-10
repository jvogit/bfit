import React, { useState } from 'react';
import {
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem
} from "baseui/header-navigation";
import { Button } from 'baseui/button';
import LoginModal from "components/cards/LoginModal";
import RegisterModal from "components/cards/RegisterModal";

export default ({ onLogin }) => {
  const [loginModal, showLoginModal] = useState(false);
  const [registerModal, showRegisterModal] = useState(false);

  const showLogin = () => {
    showLoginModal(true);
  };

  const closeLogin = () => {
    showLoginModal(false);
  };

  const showRegister = () => {
    showRegisterModal(true);
  };

  const closeRegister = () => {
    showRegisterModal(false);
  }

  const closeLoginThenShowRegister = () => {
    closeLogin();
    showRegister();
  }

  const closeRegisterThenShowLogin = () => {
    closeRegister();
    showLogin();
  }

  const closeLoginThenCall = () => {
    closeLogin();
    if (onLogin) onLogin();
  }

  return (
    <StyledNavigationList $align={ALIGN.right}>
    <StyledNavigationItem>
      <Button onClick={showLogin}>
        Login
      </Button>
    </StyledNavigationItem>
    <LoginModal isOpen={loginModal} onClose={closeLogin} onSuccess={closeLoginThenCall} onClickSignup={closeLoginThenShowRegister}/>
    <RegisterModal isOpen={registerModal} onClose={closeRegister} onSuccess={closeRegisterThenShowLogin}/>
  </StyledNavigationList>
  )
}