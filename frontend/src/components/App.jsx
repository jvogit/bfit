import React, { useState, useEffect } from 'react';
import { Router, Route, useHistory, Switch } from 'react-router-dom';
import AuthRoute from 'components/routes/AuthRoute';
import HeaderNavBar from 'components/navbars/HeaderNavBar';
import BoxCard from 'components/cards/BoxCard';
import Loading from 'components/layouts/Loading';
import Home from 'pages/Home';
import Dashboard from 'pages/Dashboard';
import CalorieRecordCreate from 'pages/CalorieRecordCreate';
import Login from 'pages/Login';
import Register from 'pages/Register';

function App(props) {
  const [isLoading, setLoading] = useState(false);

  if (isLoading) return <Loading />

  return (
    <React.StrictMode>
      <Router history={props.history}>
          <HeaderNavBar />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/signup' exact component={Register} />
            <Route path='/login' exact component={Login}/>
            <AuthRoute path='/dashboard' exact component={Dashboard} />
            <AuthRoute path ='/records/calorie/create' exact component={CalorieRecordCreate} />
            <Route path='/pwdGenerator' exact component={BoxCard} />
          </Switch>
      </Router>
    </React.StrictMode>
  );
}

export default App;
