import React, { Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { LayoutSplashScreen, ContentRoute } from '../../_metronic/layout';
import { GroupsTable } from '../modules/Groups'

export function DashboardPage() {
  return <>
    {/* begin::Dashboard */}

    {/* begin::Row */}
    <div className="row">
      <div className="col-lg-12">
        <Suspense fallback={<LayoutSplashScreen />}>
          <Switch>
            <ContentRoute path="/dashboard/groups" component={GroupsTable} />
            <Redirect from="/dashboard" to="/dashboard/groups" exact />
          </Switch>
        </Suspense>
      </div>
    </div>
    {/* end::Row */}

    {/* end::Dashboard */}
  </>;
}
