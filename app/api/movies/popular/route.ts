import { Movie } from '@/types/movies/movie'
import { NextResponse, NextRequest } from 'next/server'

type Dates = {
  maximum: string
  minimum: string
}

type PopularResponse = {
  dates: Dates
  results: Movie[]
  page: number
  total_pages: number
  total_results: number
}

export async function GET(req: NextRequest) {
  try {
    const response = await fetch(
      `${process.env.TMDB_API_URL}/3/movie/popular?api_key=${process.env.TMDB_API_KEY}`
    )
    if (!response.ok) {
      return NextResponse.json(response.json())
    }

    const data: PopularResponse = await response.json()
    return NextResponse.json(data)
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred'
    return NextResponse.json({ error: errorMessage })
  }
}
