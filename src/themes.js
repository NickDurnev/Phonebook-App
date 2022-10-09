const base = {
  mainTextFontWeight: '500',
  listItemBcgColor: 'rgba(157, 153, 153, 0.253)',
  backdropColor: 'rgba(0, 0, 0, 0.2)',
  marksBgColor: '#D0CD94',
  hoverTransition: '300ms',
  hoverTimeFunction: 'linear',
  animationDuration: '300ms',
  longAnimationDuration: '1000ms',
  animationTimeFunction: `both`,
};

export const light = {
  ...base,
  name: 'Light',
  bgColor: '#f3f3f3',
  textColor: '#000',
  bgElementColor: '#60D0CA',
  linkActiveColor: '#ecfcb4',
  elementColor: '#fff',
  bgElementHoverColor: '#50aaa6',
  boxShadow: ' 0px 5px 10px 2px rgba(34, 60, 80, 0.2)',
};

export const dark = {
  ...light,
  name: 'Dark',
  bgColor: '#46494C',
  textColor: '#FAFAFA',
  bgElementColor: '#95A6B2',
  linkActiveColor: '#DCDCDD',
  bgElementHoverColor: '#718998',
};

export const blue = {
  ...light,
  name: 'Blue',
  bgColor: '#4d4d8a',
  textColor: '#fff',
  bgElementColor: '#b4b882',
  linkActiveColor: '#69aaf5',
  bgElementHoverColor: '#c4c393',
};
