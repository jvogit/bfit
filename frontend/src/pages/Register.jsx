import React from 'react';
import CenterCard from 'components/cards/CenterCard';
import RegisterForm from 'components/forms/RegisterForm';
import { Redirect, useHistory } from 'react-router-dom';

export default ({authenticated}) => {
  console.log('Testing ' + authenticated);
  if (authenticated) {
    return (<Redirect to="/dashboard" />);
  };
  let history = useHistory();

  const onRegister = () => {
    history.push("/login");
    window.location.reload();
  }

  return (
    <CenterCard title="Register">
      <RegisterForm onSuccess={onRegister}/>
    </CenterCard>
  );
}