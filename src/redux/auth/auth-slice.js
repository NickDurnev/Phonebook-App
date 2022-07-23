import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: { name: null, email: null },
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      {payload}) =>
    {
      console.log(payload);
      state.user = payload.user;
      state.token = payload.token;
    },
  },
});

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;
