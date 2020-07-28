import React from "react";
import { GroupsTable } from '../../../app/modules/Groups'

export function Demo2Dashboard() {
  return <>
    {/* begin::Dashboard */}

    {/* begin::Row */}
    <div className="row">
      <div className="col-lg-12">
        <GroupsTable className="card-stretch gutter-b" />
      </div>
    </div>
    {/* end::Row */}

    {/* end::Dashboard */}
  </>;
}
