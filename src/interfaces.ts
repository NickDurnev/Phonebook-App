export interface IAuth {
  user: {
    name: string;
    email: string;
    verify: string;
  };
  token: string;
}

export interface ITheme {
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
  [x: string]: string,
}

export interface IContact {
  contactID: string;
  userID: string;
  name: string;
  phone: string;
  favorite: boolean;
  avatarURL?: string;
  email?: string;
  surname?: string;
}

export interface IUser {
  userID: string;
  password: string;
  email: string;
  name: string;
  subscription: string;
  verify: boolean;
  token: string;
  verificationToken: null | string;
  resetPasswordToken: null | string;
}

export interface IQuery {
  favorite: boolean;
  page: string;
  query: string;
  formData: object;
  contactID: string;
  userID: string;
  token: string
}