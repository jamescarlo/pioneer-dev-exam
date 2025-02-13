'use client'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Movie } from '@/types/movies'
import { StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  movies: Movie[] | null
}

function PopularSection({ movies }: Props) {
  return (
    <section className='max-w-7xl mx-auto' id='popular'>
      <h2 className='text-yellow-500 text-3xl font-bold mb-4'>Popular now!</h2>
      <div className='w-full'>
        <Carousel className='w-full'>
          <CarouselContent>
            {movies?.map((i: Movie) => (
              <CarouselItem
                key={i.id}
                className='basis-1/5 flex flex-col gap-y-10 mx-4'
              >
                <Link href={`/movie/${i.id}`}>
                  <Card className='relative w-64 h-96 overflow-hidden rounded-2xl shadow-lg'>
                    <div className='absolute inset-0  rounded-2xl'>
                      <Image
                        src={
                          process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_PATH +
                          i.backdrop_path
                        }
                        alt={i.original_title}
                        className='h-full w-full object-cover'
                        width={500}
                        height={500}
                      />
                    </div>

                    <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent' />

                    <div className='absolute top-4 left-4 text-white text-4xl font-bold flex flex-row gap-x-2 items-center'>
                      <StarIcon fill='#eab308' color='transparent' size={32} />
                      {i.vote_average.toFixed(1)}
                    </div>

                    <CardContent className='absolute bottom-4 left-4 text-white'>
                      <h2 className='text-2xl font-bold'>{i.title}</h2>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  )
}

export default PopularSection
