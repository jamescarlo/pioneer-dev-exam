'use server'
import { Movie } from '@/types/movies/movie'

export const getMovieDetails = async (id: string): Promise<Movie | null> => {
  try {
    if (!id) {
      console.error('Invalid movie ID provided')
      return null
    }

    const apiUrl = `${process.env.TMDB_API_URL}/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      console.error(
        `Failed to fetch movie details. Status: ${response.status} ${response.statusText}`
      )
      return null
    }

    const data: Movie = await response.json()

    return data
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred'
    console.error('Error fetching movie details:', errorMessage)
    return null
  }
}

type Dates = {
  maximum: string
  minimum: string
}

type NowPlayingResponse = {
  dates: Dates
  results: Movie[]
  page: number
  total_pages: number
  total_results: number
}

export const getNowPlayingMovies = async () => {
  try {
    const apiUrl = `${process.env.TMDB_API_URL}/3/movie/now_playing?api_key=${process.env.TMDB_API_KEY}`

    const response = await fetch(apiUrl)
    if (!response.ok) {
      console.error(
        `Failed to fetch Now playing movies. Status: ${response.status} ${response.statusText}`
      )
      return null
    }

    const data: NowPlayingResponse = await response.json()
    return data.results
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred'
    console.error('Error fetching now playing movies:', errorMessage)

    return null
  }
}

export const getPopularMovies = async () => {
  try {
    const apiUrl = `${process.env.TMDB_API_URL}/3/movie/popular?api_key=${process.env.TMDB_API_KEY}`

    const response = await fetch(apiUrl)
    if (!response.ok) {
      console.error(
        `Failed to fetch Popular Movies. Status: ${response.status} ${response.statusText}`
      )
      return null
    }

    const data: NowPlayingResponse = await response.json()
    return data.results
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred'
    console.error('Error fetching popular movies:', errorMessage)

    return null
  }
}
