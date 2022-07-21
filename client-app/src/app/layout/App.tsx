import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../layout/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import HomePage from '../../features/home/homePage';
import { Route, useLocation } from 'react-router-dom'
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import TestError from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';


function App() {

  const location = useLocation();

  return (
    <>
    <ToastContainer position='bottom-right' hideProgressBar/>
      <Route exact path='/' component={HomePage} />
      <Route path='/(.+)'
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Route exact path='/activities' component={ActivityDashboard} />
              <Route path='/activities/:id' component={ActivityDetails} />
              <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} />
              <Route path='/errors' component={TestError} />
            </Container>

          </>
        )}
      />
    </>
  );
}

export default observer(App);

