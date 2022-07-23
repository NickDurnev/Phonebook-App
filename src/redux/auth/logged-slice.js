import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  logged: false,
};

const loggedSlice = createSlice({
  name: 'logged',
  initialState,
  reducers: {
    setLoggedIn: (state, { payload }) => {
      state.logged = payload
    } 
  },
});

export const { setLoggedIn } = loggedSlice.actions;
export default loggedSlice.reducer;
