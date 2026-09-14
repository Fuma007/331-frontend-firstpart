import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getEvents(_perPage: number, _page: number) {
    return apiClient.get('/events?_limit=' + _perPage + '&_page=' + _page)
  },
  getEvent(id: number) {
    return apiClient.get('/events/' + id)
  },
}
