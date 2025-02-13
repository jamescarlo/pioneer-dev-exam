'use client'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { TMDB_IMAGE_PATH } from '@/lib/constants'
import { Movie } from '@/types/movies/movie'
import Autoplay from 'embla-carousel-autoplay'
import { ThumbsUp } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  movies: Movie[] | null
}

function NowPlayingSection({ movies }: Props) {
  return (
    <section className='relative mb-8 max-w-[1700px] mx-auto'>
      <div className='flex items-center justify-between'>
        <Carousel
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
        >
          <CarouselContent>
            {movies?.map((i: Movie) => (
              <CarouselItem className='relative' key={i.id}>
                <h1 className='text-white absolute top-10 font-extrabold text-5xl left-20 z-10'>
                  Now Playing
                </h1>
                <Image
                  src={TMDB_IMAGE_PATH + i.backdrop_path}
                  width={800}
                  height={800}
                  className='h-[calc(100vh-72px)] w-full max-h-[1200px]'
                  alt={i.original_title}
                />
                <div className='absolute bottom-5 left-20 flex flex-row gap-x-4'>
                  <Image
                    src={TMDB_IMAGE_PATH + i.poster_path}
                    width={160}
                    height={260}
                    alt={i.original_title}
                  />
                  <div className='w-1/3 z-10'>
                    <Link href={`/movie/${i.id}`}>
                      <h1 className='text-white text-3xl font-extrabold line-clamp-1'>
                        {i.title}
                      </h1>
                    </Link>
                    <h4 className='text-white text-xl font-normal line-clamp-4'>
                      {i.overview}
                    </h4>
                    <span className='text-white text-lg font-normal'>
                      {new Date(i.release_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                    <div className='text-white flex flex-row gap-x-2 mt-4 items-center'>
                      <ThumbsUp color='white' />
                      {Math.round(i.popularity)} Likes
                    </div>
                  </div>
                </div>
                <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70' />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}

export default NowPlayingSection
