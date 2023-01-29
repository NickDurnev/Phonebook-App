import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuth, IRegistration } from '../../services/interfaces';

const initialState = {
  user: { id: '', name: '', email: '', verify: false },
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
    setRegistrationCredentials: (state, { payload }: PayloadAction<IRegistration>) => {
      state.user = {...state.user, ...payload.user };
    },
    setVerify: (state, { payload }: PayloadAction<boolean>) => {
      state.user.verify = payload;
    },
  },
});

export const { setCredentials, setRegistrationCredentials, setVerify } = authSlice.actions;
export default authSlice.reducer;
