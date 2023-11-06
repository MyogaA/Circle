// src/features/user/userSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  token: string | null;
}

const initialState: UserState = {
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      localStorage.setItem('token',action.payload as string)
    },
  },
});

export const { setToken } = userSlice.actions;

export default userSlice.reducer;
