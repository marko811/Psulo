import * as React from 'react'
import { IDataContext } from './types'

export const DataContext = React.createContext<IDataContext>({
  currentPage: 1,
  currentCategoryId: undefined,
  setCurrentCategoryId: () => {},
  loadPictures: async () => {},
  changeToNextPage: async () => {},
  loadCategories: async () => {},
  pictures: undefined,
  categories: undefined,
  hasMore: false,
})
