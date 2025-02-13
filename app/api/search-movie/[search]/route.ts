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

type Params = {
  params: {
    search: string
  }
}

export async function GET(
  req: NextRequest,
  res: NextResponse,
  { params }: Params
) {
  try {
    const { search } = await params

    if (!search) {
      return NextResponse.json({
        error: 'No search query is present in request.',
      })
    }

    const searchParams = new URLSearchParams({
      query: search,
      include_adult: 'false',
      language: 'en-US',
      page: '1',
    })

    const response = await fetch(
      `${process.env.TMDB_API_URL}/3/search/collection?api_key=${process.env.TMDB_API_KEY}&${searchParams}`
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
