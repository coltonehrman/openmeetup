import React from 'react';
import SVG from 'react-inlinesvg';
import { toAbsoluteUrl } from '../../../../_metronic/_helpers';
import * as actions from '../_redux/groupsActions';

const GroupData = ({
  id,
  title = 'Default Group Title',
  description = 'default group description',
  members = [],
  events = [],
  categories = [],
  dispatch
}) => {
  return (
    <tr>
      {/* begin::Checkbox */}
      <td className="pl-0">
        <label className="checkbox checkbox-lg checkbox-single">
          <input type="checkbox" value={id} /><span />
        </label>
      </td>
      {/* end::Checkbox */}

      {/* begin::ID */}
      <td>
        <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
          {id}
        </span>
      </td>
      {/* end::ID */}
      
      {/* begin::Title & Description */}
      <td>
        <span className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">
          {title}
        </span>

        <span className="text-muted font-weight-bold text-muted d-block">
          {description}
        </span>
      </td>
      {/* end::Title & Description */}

      {/* begin::Members */}
      <td>
        <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
          {members.length}
        </span>
      </td>
      {/* end::Members */}

      {/* begin::Events */}
      <td>
        <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
          {events.length}
        </span>
      </td>
      {/* end::Events */}

      {/* begin::Categories */}
      <td>
        <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
          {categories.length}
        </span>
      </td>
      {/* end::Categories */}

      {/* begin::Actions */}
      <td className="pr-0 text-right">
        <button className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3">
          <span className="svg-icon svg-icon-md svg-icon-primary">
            <SVG src={toAbsoluteUrl('/media/svg/icons/Communication/Write.svg')} />
          </span>
        </button>

        <button
          onClick={() => dispatch(actions.deleteGroup(id))}
          className="btn btn-icon btn-light btn-hover-primary btn-sm"
        >
          <span className="svg-icon svg-icon-md svg-icon-primary">
            <SVG src={toAbsoluteUrl('/media/svg/icons/General/Trash.svg')} />
          </span>
        </button>
      </td>
      {/* end::Actions */}
    </tr>
  );
};

export default GroupData;
