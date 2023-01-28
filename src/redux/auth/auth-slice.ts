import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuth } from '../../services/interfaces';

const initialState = {
  user: { id: '', name: '', email: '', verify: '' },
  token: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload }: PayloadAction<IAuth>) => {
      state.user = payload.user;
      state.token = payload.token;
    },
    setVerify: (state, { payload }: PayloadAction<string>) => {
      state.user.verify = payload;
    },
  },
});

export const { setCredentials, setVerify } = authSlice.actions;
export default authSlice.reducer;
