import * as React from 'react'
import { RouteComponentProps } from '@reach/router'
import { CoreLayout } from '../../layouts/CoreLayout'
import { DefaultContent } from '../../layouts/DefaultContent'
import { PictureGrid } from '../../components/PictureGrid'
import { useContext, useEffect } from 'react'
import { DataContext } from '../../components/DataContext/context'

export const Trending: React.FC<RouteComponentProps> = React.memo(({}) => {
  const { setCurrentCategoryId } = useContext(DataContext)

  useEffect(() => {
    setCurrentCategoryId(undefined)
  }, [setCurrentCategoryId])

  return (
    <CoreLayout withCategoriesLeftMenu={false}>
      <DefaultContent header="Trending images">
        <PictureGrid categoryId={undefined} />
      </DefaultContent>
    </CoreLayout>
  )
})
