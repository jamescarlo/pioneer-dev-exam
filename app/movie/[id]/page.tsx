import { notFound } from 'next/navigation'
import MovieDetails from './_movie-details'

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id

  if (!id) {
    notFound()
  }

  return <MovieDetails id={id} />
}

export default Page
