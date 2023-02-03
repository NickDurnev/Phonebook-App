import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  userAvatarID: string;
}

const initialState: State = { userAvatarID: "9" };

const avatarsSlice = createSlice({
  name: 'avatarsID',
  initialState,
  reducers: {
    addAvatar: (state, { payload }: PayloadAction<string>) => {
      state.userAvatarID = payload;
    },
  },
});

export const { addAvatar } = avatarsSlice.actions;
export default avatarsSlice.reducer;
