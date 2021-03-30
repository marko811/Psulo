import { desaturate, opacify } from 'polished'

export const themeColors = {
  cornflower: '#6b69ed',
  modalBg: '#3F3B4F',
  dark: '#312d3f',
  darkTwo: '#292636',
  green: '#04c779',
  greenBlue: '#23d18c',
  red: '#ff3d3d',
  warmBlue: '#4845d8',
  white: '#ffffff',
  deleteRed: '#ff4444',
  gray: '#74747C',
  washedPurple: '#584E69',
}

export const theme = {
  colors: themeColors,
  fontSizes: [14, 16, 20, 40, 60],
  space: [0, 7, 20, 30, 41, 50, 60, 70],
  sizes: [0, 38, 64, 135, 200, 245, 340],
}

export const disabledColorFilter = desaturate(0.5)
export const halfVisible = opacify(0.5)
