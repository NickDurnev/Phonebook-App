import { createSlice } from '@reduxjs/toolkit';

const initialState = {userAvatarID: null};

const avatarsSlice = createSlice({
  name: 'avatarsID',
  initialState,
  reducers: {
    addAvatar: (
      state,
      {payload}) =>
    {
      console.log(payload);
          state.userAvatarID = payload;
    },
  },
});

export const { addAvatar } = avatarsSlice.actions;
export default avatarsSlice.reducer;