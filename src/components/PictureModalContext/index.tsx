import * as React from 'react'
import { PictureModalContext } from './context'
import { useMemo, useState } from 'react'
import { IModalContext } from './types'
import { IPicture } from '../../api/pictures'

export const PictureModalContextProvider: React.FC = React.memo(({ children }) => {
  const [openedPicture, setOpenedPicture] = useState<IPicture | undefined>(undefined)

  const value = useMemo((): IModalContext => {
    return {
      openedPicture,
      openPicture: setOpenedPicture,
    }
  }, [openedPicture, setOpenedPicture])
  return <PictureModalContext.Provider value={value}>{children}</PictureModalContext.Provider>
})
