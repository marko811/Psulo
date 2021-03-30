import * as React from 'react'
import { DataContext } from './context'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { fetchPictures, IPicture } from '../../api/pictures'
import { fetchAllCategories, ICategory } from '../../api/categories'
import { IDataContext } from './types'

export const DataContextProvider: React.FC = React.memo(({ children }) => {
  // undefined means the data is loading (not yet fetched)
  // empty array means the data has been loaded, but there is no data
  const [pictures, setPictures] = useState<IPicture[] | undefined>(undefined)
  const [categories, setCategories] = useState<ICategory[] | undefined>(undefined)
  const [hasMore, setHasMore] = useState(false)

  // undefined means "trending" category
  const [currentCategoryId, setCurrentCategoryId] = useState<number | undefined>(undefined)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const loadPictures = useCallback(
    async (categoryId: number | undefined, page: number = 1) => {
      if (page === 1) {
        setPictures([])
      }

      const response = await fetchPictures(categoryId, page)

      // if that's the first page, that means we changed the category!
      let picturesToSet: IPicture[]
      if (page === 1) {
        picturesToSet = response.data.pictures
      } else {
        picturesToSet = [...(pictures || []), ...response.data.pictures]
      }
      setPictures(picturesToSet)
      setHasMore(picturesToSet.length < response.data.totalCount)
    },
    [pictures, setPictures, setCurrentCategoryId],
  )

  const changeToNextPage = useCallback(() => {
    setCurrentPage(page => page + 1)
  }, [setCurrentPage])

  const loadCategories = useCallback(async () => {
    const categories = await fetchAllCategories()
    setCategories(categories.data)
  }, [setCategories])

  useEffect(() => {
    loadCategories()
  }, [loadCategories])

  const setCurrentCategoryIdHandler = useCallback(
    (id: number | undefined) => {
      setCurrentCategoryId(id)
      setCurrentPage(1)
      setPictures([])
    },
    [setCurrentCategoryId, setCurrentPage],
  )
  const value = useMemo((): IDataContext => {
    return {
      categories,
      pictures,
      loadPictures,
      changeToNextPage,
      loadCategories,
      currentPage,
      currentCategoryId,
      hasMore,
      setCurrentCategoryId: setCurrentCategoryIdHandler,
    }
  }, [
    pictures,
    setPictures,
    categories,
    setCategories,
    hasMore,
    changeToNextPage,
    currentPage,
    setCurrentCategoryIdHandler,
  ])
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
})
