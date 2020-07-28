import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import { groupsSlice } from "../app/modules/Groups";

export const rootReducer = combineReducers({
  auth: auth.reducer,
  groups: groupsSlice.reducer
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
