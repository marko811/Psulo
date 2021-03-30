import axios from 'axios'
import { API_ENDPOINT } from './config'

export interface IPicture {
  id: number
  blurHash?: string
  name: string
  width: number
  height: number
  popularity: number
  urls: {
    regular: string
    small: string
  }
}

// category = undefined means trending images
export const fetchPictures = (categoryId: number | undefined, page: number) => {
  return axios.get<{
    page: number
    categoryId: number | undefined
    pictures: IPicture[]
    totalCount: number
  }>(`${API_ENDPOINT}/pictures`, {
    params: {
      categoryId,
      page,
    },
  })
}
