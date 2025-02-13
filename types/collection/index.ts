export interface Collection {
  adult: boolean
  backdrop_path: string | null
  id: number
  name: string
  original_language: string
  original_name: string
  overview: string
  poster_path: string | null
}

export interface CollectionResponse {
  page: number
  results: Collection[]
  total_pages: number
  total_results: number
}
