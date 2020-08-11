import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
import { getUserSession, logoutUserSession } from "./authCrud";

export const actionTypes = {
  Login: "[Login] Action",
  Logout: "[Logout] Action",
  Register: "[Register] Action",
  UserRequested: "[Request User] Action",
  UserLoaded: "[Load User] Session API",
};

const initialAuthState = {
  user: null
};

export const reducer = persistReducer(
  { storage, key: 'openmeetup', whitelist: ['user'] },
  (state = initialAuthState, action) => {
    // console.log(state, action);
    switch (action.type) {
      case actionTypes.Login: {
        const { user } = action.payload;
        return { user };
      }

      case actionTypes.Register: {
        const { user } = action.payload;
        return { user };
      }

      case actionTypes.Logout: {
        return initialAuthState;
      }

      case actionTypes.UserLoaded: {
        const { user } = action.payload;
        return { user };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  login: (user) => ({
    type: actionTypes.Login,
    payload: { user }
  }),
  register: (user) => ({
    type: actionTypes.Register,
    payload: { user },
  }),
  logout: () => ({
    type: actionTypes.Logout
  }),
  requestUser: () => ({
    type: actionTypes.UserRequested
  }),
  fulfillUser: (user) => ({
    type: actionTypes.UserLoaded,
    payload: { user }
  })
};

export function* saga() {
  yield takeLatest(actionTypes.Login, function* loginSaga() {
    yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.Register, function* registerSaga() {
    yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.Logout, function* logoutSaga() {
    yield logoutUserSession();
    yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.UserRequested, function* userRequested() {
    const { data: user } = yield getUserSession();
    yield put(actions.fulfillUser(user));
  });
}
