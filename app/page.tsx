import { getNowPlayingMovies, getPopularMovies } from '@/actions/movies'
import CarouselSection from './_home/ _now-playing-section'
import PopularSection from './_home/_popular-section'
import { notFound } from 'next/navigation'

async function Page() {
  const nowPlayingMovies = await getNowPlayingMovies()
  const popularMovies = await getPopularMovies()

  if (!nowPlayingMovies && !popularMovies) {
    notFound()
  }

  return (
    <div className='mx-auto flex flex-col gap-y-4 py-10'>
      <CarouselSection movies={nowPlayingMovies} />
      <PopularSection movies={popularMovies} />
    </div>
  )
}

export default Page
