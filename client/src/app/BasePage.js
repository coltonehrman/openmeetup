import React, { Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { LayoutSplashScreen, ContentRoute } from '../_metronic/layout';
import { DashboardPage } from './pages/DashboardPage';

export default function BasePage() {
  // useEffect(() => {
  //   console.log('Base page');
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <Redirect exact from="/" to="/dashboard" />
        <ContentRoute path="/dashboard" component={DashboardPage} />
      </Switch>
    </Suspense>
  );
}
