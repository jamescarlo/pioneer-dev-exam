'use client'
import { TMDB_IMAGE_PATH, YOUTUBE_BASE_URL } from '@/lib/constants'
import { MovieDetails as MovidetailsType } from '@/types/movies'
import Image from 'next/image'
import { useEffect, useState, useTransition } from 'react'
import { Video } from '@/types/videos'
import { Skeleton } from '@/components/ui/skeleton'
import { ThumbsUp } from 'lucide-react'
interface Props {
  id: string
}

function MovieDetails({ id }: Props) {
  const [isMoviePending, startMovieTransition] = useTransition()
  const [isVideoPending, startVideoTransition] = useTransition()
  const [data, setData] = useState<MovidetailsType | null>(null)
  const [trailer, setTrailer] = useState<Video | null>(null)

  const fetchNowPlaying = async () => {
    const response = await fetch(`/api/movies/${id}`)
    const data = await response.json()

    startMovieTransition(() => {
      if (data) {
        setData(data)
      }
    })
  }

  const fetchTrailer = async () => {
    const response = await fetch(`/api/trailer/${id}`)
    const data = await response.json()

    startVideoTransition(() => {
      if (data.results.length) {
        const trailer = data.results.find(
          (result: Video) =>
            result.type === 'Trailer' || result.type === 'Teaser'
        )

        if (trailer) {
          setTrailer(trailer)
        }
      }
    })
  }

  useEffect(() => {
    fetchNowPlaying()
    fetchTrailer()
  }, [])

  return (
    <div>
      {isMoviePending || isVideoPending ? (
        <div className='flex flex-col gap-y-4 max-w-5xl mx-auto justify-center items-start my-20'>
          <Skeleton className='w-full h-[480px] rounded-lg' />
          <div className='flex flex-col gap-y-4 w-full'>
            <div>
              <Skeleton className='h-10 w-1/3 rounded-lg mb-4' />
              <div className='space-y-3'>
                <Skeleton className='h-4 w-full rounded' />
                <Skeleton className='h-4 w-5/6 rounded' />
                <Skeleton className='h-4 w-4/6 rounded' />
              </div>
            </div>
          </div>
        </div>
      ) : (
        data && (
          <div className='flex flex-col gap-y-4 max-w-5xl mx-auto justify-center items-start my-20 text-white'>
            {trailer ? (
              <iframe
                width='100%'
                height='480'
                src={`${YOUTUBE_BASE_URL}embed/${trailer.key}?autoplay=1&controls=0`}
                title={`${data.title} trailer`}
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              />
            ) : (
              <Image
                width={1000}
                height={480}
                src={TMDB_IMAGE_PATH + data.backdrop_path}
                alt={data.title}
              />
            )}
            <div className='flex flex-row gap-x-4 my-10'>
              <Image
                width={200}
                height={480}
                src={TMDB_IMAGE_PATH + data.poster_path}
                alt={data.title}
              />
              <div className='flex flex-col gap-y-4 w-2/3'>
                <h1 className='text-4xl font-bold mb-4'>{data.title}</h1>
                <p className='text-lg leading-relaxed'>{data.overview}</p>

                <div className='text-white flex flex-row gap-x-2 mt-4 items-center'>
                  <ThumbsUp color='white' />
                  {Math.round(data.popularity)} Likes
                </div>

                <div>{data.genres.map((genre) => genre.name).join(', ')}</div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  )
}

export default MovieDetails
