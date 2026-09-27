export interface Bid {
  id: number
  amount: number
  datetime: string
}

export interface AuctionItem {
  id: number | null
  description: string
  type: string
  bids: Bid[]
  successfulBid: Bid | null
}