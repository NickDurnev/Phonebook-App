import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  userAvatarID: number | null;
}

const initialState: State = { userAvatarID: null };

const avatarsSlice = createSlice({
  name: 'avatarsID',
  initialState,
  reducers: {
    addAvatar: (state, { payload }: PayloadAction<number| null>) => {
        state.userAvatarID = payload;
    },
  },
});

export const { addAvatar } = avatarsSlice.actions;
export default avatarsSlice.reducer;
