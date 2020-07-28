import { createSlice } from '@reduxjs/toolkit';

const initialGroupsState = {
  listLoading: false,
  actionsLoading: false,
  entities: null,
  groupForEdit: null,
  lastError: null
};

export const callTypes = {
  list: 'list',
  action: 'action'
};

export const groupsSlice = createSlice({
  name: 'groups',
  initialState: initialGroupsState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    // findAllGroups
    groupsFetches: (state, action) => {
      const entities = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
    },
    // createGroup
    groupCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // deleteGroup
    groupDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.id !== action.payload);
    }
  }
});
