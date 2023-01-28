import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  userAvatarID: string | null;
}

const initialState: State = { userAvatarID: null };

const avatarsSlice = createSlice({
  name: 'avatarsID',
  initialState,
  reducers: {
    addAvatar: (state, { payload }: PayloadAction<string | null>) => {
      state.userAvatarID = payload;
    },
  },
});

export const { addAvatar } = avatarsSlice.actions;
export default avatarsSlice.reducer;
