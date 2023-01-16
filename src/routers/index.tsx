import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

// Layouts
import { FullLayout } from 'src/layouts/FullLayout/FullLayout';

// Pages
import { BasicRoute } from './BasicRoute';
import { HomePage } from 'src/pages/HomePage/HomePage';
import { DemoPage } from 'src/pages/DemoPage/DemoPage';

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
          isPrivate={false}
        />
      </Switch>
    </Router>
  );
}
