const base = {
  mainTextFontWeight: '500',
  listItemBcgColor: 'rgba(157, 153, 153, 0.253)',
  backdropColor: 'rgba(0, 0, 0, 0.2)',
  marksBgColor: '#D0CD94',
  hoverTransition: '300ms',
  hoverTimeFunction: 'linear',
  animationDuration: '500ms',
  longAnimationDuration: '5000ms',
  animationTimeFunction: 'linear',
};

export const light = {
  ...base,
  name: 'Light',
  bgColor: '#f3f3f3',
  textColor: '#000',
  bgElementColor: '#3AB795',
  linkActiveColor: '#ecfcb4',
  elementColor: '#fff',
  bgElementHoverColor: '#319B7F',
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
  bgColor: '#B6C5E2',
  textColor: '#fff',
  bgElementColor: '#4387C7',
  linkActiveColor: '#B8E0D2',
  bgElementHoverColor: '#8EB3CD',
};
