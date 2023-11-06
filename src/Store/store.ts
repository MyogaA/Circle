import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Store/Slice/userSlice';
import { authSlice } from './Slice/Authslice';

export const { AUTH_LOGIN, AUTH_CHECK, AUTH_ERROR, AUTH_LOGOUT } = authSlice.actions
export const authReducer = authSlice.reducer
const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
