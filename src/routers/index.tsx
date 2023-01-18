import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

// Layouts
import { FullLayout } from 'src/layouts/FullLayout/FullLayout';

// Pages
import { BasicRoute } from './BasicRoute';
import { HomePage } from 'src/pages/HomePage/HomePage';
import { DemoPage } from 'src/pages/DemoPage/DemoPage';
import { LoginPage } from 'src/pages/authentication/LoginPage/LoginPage';
import { CreateAccountPage } from 'src/pages/authentication/CreateAccountPage/CreateAccountPage';

export function Routers() {
  return (
    <Router>
      <Switch>
        <BasicRoute
          exact
          path="/"
          component={HomePage}
          layout={FullLayout}
          isPrivate={false}
        />

        <BasicRoute
          exact
          path="/demo"
          component={DemoPage}
          layout={FullLayout}
          isPrivate={true}
        />

        <BasicRoute
          exact
          path="/login"
          component={LoginPage}
          layout={FullLayout}
          isPrivate={false}
        />

        <BasicRoute
          exact
          path="/signup"
          component={CreateAccountPage}
          layout={FullLayout}
          isPrivate={false}
        />
      </Switch>
    </Router>
  );
}
