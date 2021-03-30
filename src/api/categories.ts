import axios from 'axios'
import { API_ENDPOINT } from './config'

export interface ICategory {
  id: number
  name: string
  categoryGroupName: string | null
  picturesCount: number
}

export const fetchAllCategories = async () => {
  return axios.get<ICategory[]>(`${API_ENDPOINT}/categories`)
}
