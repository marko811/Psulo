import * as React from 'react'
import { RouteComponentProps } from '@reach/router'
import { CoreLayout } from '../../layouts/CoreLayout'
import { DefaultContent } from '../../layouts/DefaultContent'
import { PictureGrid } from '../../components/PictureGrid'
import { useContext, useEffect } from 'react'
import { DataContext } from '../../components/DataContext/context'

export const Category: React.FC<RouteComponentProps<{ categoryId: string }>> = React.memo(
  ({ categoryId }) => {
    const { setCurrentCategoryId } = useContext(DataContext)

    useEffect(() => {
      if (categoryId) {
        setCurrentCategoryId(parseInt(categoryId, 10))
      }
    }, [setCurrentCategoryId, categoryId])

    const { categories } = useContext(DataContext)
    const category = categories?.find(c => c.id.toString() === categoryId)
    return (
      <CoreLayout withCategoriesLeftMenu={true}>
        <DefaultContent header={`Category ${category ? category.name : '...'}`}>
          {category && <PictureGrid categoryId={category.id} />}
        </DefaultContent>
      </CoreLayout>
    )
  },
)
