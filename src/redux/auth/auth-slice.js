import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: { name: null, email: null, verify: null },
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
    },
    setVerify: (state, { payload }) => {
      state.user.verify = payload;
    },
  },
});

export const { setCredentials, setVerify } = authSlice.actions;
export default authSlice.reducer;
