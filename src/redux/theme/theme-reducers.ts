import { createReducer,PayloadAction } from '@reduxjs/toolkit';
import { light } from '../../config/themes';
import changeTheme from './theme-actions';
import { ITheme} from '../../services/interfaces';

const themeReducer = createReducer(light, {
  [changeTheme.type]: (_, { payload }: PayloadAction<ITheme>) => payload,
});

export default themeReducer;
