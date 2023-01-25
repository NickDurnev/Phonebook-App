import { createReducer,PayloadAction } from '@reduxjs/toolkit';
import { light } from '../../config/themes';
import changeTheme from './theme-actions';

interface ITheme {
  mainTextFontWeight: string,
  listItemBcgColor: string,
  backdropColor: string,
  marksBgColor: string,
  hoverTransition: string,
  hoverTimeFunction: string,
  animationDuration: string,
  longAnimationDuration: string,
  animationTimeFunction: string,
  name: string,
  bgColor: string,
  textColor: string,
  bgElementColor: string,
  linkActiveColor: string,
  elementColor: string,
  bgElementHoverColor: string,
  boxShadow: string,
}

const themeReducer = createReducer(light, {
  [changeTheme.type]: (_, { payload }: PayloadAction<ITheme>) => payload,
});

export default themeReducer;
