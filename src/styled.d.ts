import { theme } from './theme/dark'

type ITheme = typeof theme
declare module 'styled-components' {
  export interface DefaultTheme extends ITheme {}
}
