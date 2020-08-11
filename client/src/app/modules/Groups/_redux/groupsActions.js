import * as GroupsAPI from './groupsCrud';
import { groupsSlice, callTypes } from './groupsSlice';

const { actions } = groupsSlice;

export const fetchGroups = () => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return GroupsAPI
    .findAll()
    .then(({ data }) => {
      dispatch(actions.groupsFetches(data));
    })
    .catch(error => {
      error.clientMessage = 'Can\'t find groups';
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const createGroup = groupForCreation => dispatch => {
  const { title, description, longitude, latitude } = groupForCreation;
  dispatch(actions.startCall({ callType: callTypes.action }));
  return GroupsAPI
    .createGroup(title, description, [longitude, latitude])
    .then(({ data }) => {
      dispatch(actions.groupCreated(data));
    })
    .catch(error => {
      error.clientMessage = 'Can\'t create group';
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteGroup = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return GroupsAPI
    .deleteGroup(id)
    .then(({ data }) => {
      const { id } = data;
      dispatch(actions.groupDeleted(id));
    })
    .catch(error => {
      error.clientMessage = 'Can\'t delete group';
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
