import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

export default ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={(props) => {
      return localStorage.getItem('accessToken') ? <Component {...props}/> : <Redirect to="/login" />;
    }} />
  );
};