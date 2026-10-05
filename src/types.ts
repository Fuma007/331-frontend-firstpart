export interface Event {
  id: number | null
  category: string
  title: string
  description: string
  location: string
  date: string
  time: string
  petsAllowed: boolean
  organizer: Organizer
  images: string[]
}

export interface Organizer {
  id: number | null
  organizerName: string
  address: string
  image?: string
}

export interface MessageState {
  message: string
}

export interface EventState {
  event: Event | null
}
