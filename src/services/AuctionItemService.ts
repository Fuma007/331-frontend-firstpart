import axios from 'axios'
import type { AuctionItem } from '@/types'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_AUCTION_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getAuctionItems(perPage: number, page: number) {
    return apiClient.get('/auctionitems?_limit=' + perPage + '&_page=' + page)
  },
  getAuctionItemsByKeyword(keyword: string, perPage: number, page: number) {
    return apiClient.get(
      '/auctionitems?keyword=' + keyword + '&_limit=' + perPage + '&_page=' + page,
    )
  },
  saveAuctionItem(item: AuctionItem) {
    return apiClient.post('/auctionitems', item)
  },
}
