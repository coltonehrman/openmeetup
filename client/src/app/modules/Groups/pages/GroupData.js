import React from 'react';
import SVG from 'react-inlinesvg';
import Badge from 'react-bootstrap/Badge';
import { toAbsoluteUrl } from '../../../../_metronic/_helpers';
import * as actions from '../_redux/groupsActions';
import { useDispatch } from 'react-redux';
import _ from 'lodash';

const GroupData = ({
  id,
  title = 'Default Group Title',
  description = 'default group description',
  users = [],
  events = [],
  categories = [],
  me
}) => {
  const dispatch = useDispatch();

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

      {/* begin::Users */}
      <td>
        <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
          {users.length}
        </span>
      </td>
      {/* end::Users */}

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

      {/* begin::MEMBER */}
      <td>
        <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
          {Boolean(_.get(me, 'isMember', false)) ?
            <Badge variant="success" as="button" className="border-0" onClick={console.log}>MEMBER</Badge> :
            <Badge variant="secondar" as="button" className="border-0" onClick={console.log}>NOT MEMBER</Badge>}
        </span>
      </td>
      {/* end::MEMBER */}

      {/* begin::OWNER */}
      <td>
        <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
          {Boolean(_.get(me, 'isOwner', false)) ?
            <Badge variant="success" as="button" className="border-0">OWNER</Badge> :
            <Badge variant="secondar" as="button" className="border-0">NOT OWNER</Badge>}
        </span>
      </td>
      {/* end::OWNER */}

      {/* begin::CREATOR */}
      <td>
        <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
          {Boolean(_.get(me, 'isCreator', false)) ?
            <Badge variant="success" as="button" className="border-0">CREATOR</Badge> :
            <Badge variant="secondar" as="button" className="border-0">NOT CREATOR</Badge>}
        </span>
      </td>
      {/* end::CREATOR */}

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
