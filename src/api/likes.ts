import axios from 'axios'
import { API_ENDPOINT } from './config'

export const fetchLikes = () => {
  return axios.get<{
    pictureIds: number[]
  }>(`${API_ENDPOINT}/likes`)
}

export const createLike = (pictureId: number) => {
  return axios.post(`${API_ENDPOINT}/likes`, { pictureId })
}

export const deleteLike = (pictureId: number) => {
  return axios.delete(`${API_ENDPOINT}/likes/${pictureId}`)
}
