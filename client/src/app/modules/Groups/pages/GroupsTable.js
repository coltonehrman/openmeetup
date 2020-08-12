import React, { useEffect, useState } from 'react';
import SVG from 'react-inlinesvg';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { toAbsoluteUrl } from '../../../../_metronic/_helpers';
import GroupData from './GroupData';
import GroupModal from './GroupModal';
import * as actions from '../_redux/groupsActions';

export function GroupsTable({ className }) {
  const dispatch = useDispatch();
  const [showModal, setModalShowing] = useState(false);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.groups }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchGroups());
  }, [dispatch]);

  // Groups Redux state
  const { entities } = currentState;

  return (
    <>
      <GroupModal
        show={showModal}
        onHide={() => setModalShowing(false)}
      />

      <div className={`card card-custom ${className}`}>
        {/* begin::Header */}
        <div className="card-header border-0 py-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label font-weight-bolder text-dark">
              All Groups
            </span>

            <span className="text-muted mt-3 font-weight-bold font-size-sm">
              More than 400+ new members
            </span>
          </h3>

          <div className="card-toolbar">
            <button
              onClick={() => setModalShowing(true)}
              className="btn btn-success font-weight-bolder font-size-sm"
            >
              <span className="svg-icon svg-icon-md svg-icon-white">
                <SVG
                  className="h-50 align-self-center"
                  src={toAbsoluteUrl('/media/svg/icons/Communication/Add-user.svg')}
                />
              </span>
              Add New Group
            </button>
          </div>
        </div>
        {/* end::Header */}

        {/* begin::Body */}
        <div className="card-body py-0">
          {/* begin::Table */}
          <div className="table-responsive">
            <table
              id="kt_advance_table_widget_1"
              className="table table-head-custom table-vertical-center"
            >
              <thead>
                <tr className="text-left">
                  <th className="pl-0" style={{ width: "20px" }}>
                    <label className="checkbox checkbox-lg checkbox-single">
                      <input type="checkbox" />
                      <span />
                    </label>
                  </th>
                  <th style={{ width: "20px" }}>id</th>
                  <th>title</th>
                  <th>users</th>
                  <th>events</th>
                  <th>categories</th>
                  <th>member</th>
                  <th>owner</th>
                  <th>creator</th>
                  <th className="pr-0 text-right" style={{ minWidth: "100px" }}>
                    action
                  </th>
                </tr>
              </thead>
              <tbody>
                {entities && entities.map(group => (
                  <GroupData key={group.id} {...group} />)
                )}
              </tbody>
            </table>
          </div>
          {/* end::Table */}
        </div>
        {/* end::Body */}
      </div>
    </>
  );
}
