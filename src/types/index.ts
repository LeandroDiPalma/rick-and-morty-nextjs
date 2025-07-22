export interface Character {
  id: number
  name: string
  status: string
  species: string
  image: string
  episode: string[]
  gender: string
  origin: { name: string }
  location: { name: string }
}

export interface Episode {
  id: number
  name: string
  air_date: string
  episode: string
  characters: string[]
}

export interface ApiResponse {
  info: {
    count: number
    pages: number
    next: string | null
    prev: string | null
  }
  results: Character[]
}
