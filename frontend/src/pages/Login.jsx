import React from 'react';
import CenterCard from 'components/cards/CenterCard';
import LoginForm from 'components/forms/LoginForm';
import { Button } from 'baseui/button';
import { Redirect, useHistory } from 'react-router-dom';

export default ({authenticated}) => {
  if (authenticated) {
    return (<Redirect to="/dashboard" />);
  };
  let history = useHistory();
  const onLogin = () => {
    history.push("/dashboard");
    window.location.reload();
  }

  const onClickRegister = () => {
    history.push("/signup");
  }

  return (
    <CenterCard title="Login">
      <LoginForm onSuccess={onLogin}/>
      <Button onClick={onClickRegister} overrides={{BaseButton: { style: { width: '100%' } }}}>
        Sign up
      </Button>
    </CenterCard>
  );
}