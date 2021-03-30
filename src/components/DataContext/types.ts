import { IPicture } from '../../api/pictures'
import { ICategory } from '../../api/categories'

export interface IDataContext {
  pictures: IPicture[] | undefined
  categories: ICategory[] | undefined
  loadPictures: (category: number | undefined, page: number) => Promise<void>
  changeToNextPage: () => void
  loadCategories: () => Promise<void>
  currentPage: number
  currentCategoryId: number | undefined
  setCurrentCategoryId: (categoryId: number | undefined) => void
  hasMore: boolean
}
