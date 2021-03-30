import * as React from 'react'
import { IModalContext } from './types'

export const PictureModalContext = React.createContext<IModalContext>({
  openedPicture: undefined,
  openPicture: () => {},
})
