export const base = {
  mainTextFontWeight: '500',
  textColor: 'rgba(250, 250, 250, 0.8)',
  listItemBcgColor: 'rgba(157, 153, 153, 0.253)',
  backdropColor: 'rgba(0, 0, 0, 0.1)',
  hoverTransition: '300ms',
  hoverTimeFunction: 'linear',
  animationDuration: '500ms',
  longAnimationDuration: '5000ms',
  animationTimeFunction: 'linear',
};

export const light = {
  ...base,
  name: 'Light',
  bgColor: 'rgba(255, 247, 236, 1)',
  bgElementColor: 'rgba(250, 199, 195, 1)',
  linkActiveColor: 'rgba(255, 247, 236, 1)',
  bgModalColor: 'rgba(157, 153, 153, 1)',
  bgElementHoverColor: 'rgba(169, 226, 245, 1)',
  boxShadow: ' 0px 5px 10px 2px rgba(34, 60, 80, 0.2)',
};

export const dark = {
  ...light,
  name: 'Dark',
  bgColor: 'rgba(70, 73, 76, 1)',
  bgElementColor: 'rgba(70, 73, 76, 0.8)',
  linkActiveColor: 'rgba(220, 220, 221, 1)',
  bgModalColor: 'rgba(149, 154, 153, 1)',
  bgElementHoverColor: 'rgba(113, 137, 152, 1)',
  gradientFirstColor: 'hsla(211, 66%, 87%, 1)',
  gradientSecondColor: 'hsla(348, 67%, 88%, 1)',
  gradientThirdColor: 'hsla(272, 26%, 72%, 1)',
};

export const blue = {
  ...light,
  name: 'Blue',
  bgColor: 'rgba(63, 115, 150, 1)',
  bgElementColor: 'rgba(79, 142, 181, 1)',
  linkActiveColor: 'rgba(164, 226, 249, 1)',
  bgModalColor: 'rgba(119, 189, 223, 1)',
  bgElementHoverColor: 'rgba(142, 179, 205, 1)',
    gradientFirstColor: 'hsla(211, 66%, 87%, 1)',
  gradientSecondColor: 'hsla(348, 67%, 88%, 1)',
  gradientThirdColor: 'hsla(272, 26%, 72%, 1)',

};
