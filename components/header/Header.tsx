'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TMDB_IMAGE_PATH } from '@/lib/constants'
import { Collection } from '@/types/collection'
import { Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

function Header() {
  const path = usePathname()
  const router = useRouter()

  const [searchResults, setSearchResults] = useState<Collection[] | null>(null)

  const handleSearch = (search: string) => {
    const timeoutId = setTimeout(async () => {
      if (!search.length && searchResults) {
        setSearchResults(null)
        return
      }

      if (search.length) {
        const response = await fetch(`/api/search-movie/${search}`)
        const data = await response.json()

        setSearchResults(data.results)
      }
    }, 500)
    return () => clearTimeout(timeoutId)
  }

  return (
    <header className=' bg-gray-900'>
      <div className='max-w-7xl mx-auto flex items-center justify-between px-6 py-4'>
        <Link href='/'>
          <div className='text-yellow-500 font-bold text-lg'>MOVIE HUB</div>
        </Link>
        <div className='flex items-center space-x-4'>
          <div className='relative'>
            <Input
              type='text'
              placeholder='Search movie'
              className='w-72 bg-gray-800 border-gray-700 text-white'
              onChange={(e) => handleSearch(e.target.value)}
            />
            {searchResults && searchResults.length > 0 && (
              <div className='absolute z-10 w-full mt-1 bg-white !text-black border border-gray-700 rounded-md shadow-lg'>
                <ul className='py-1'>
                  {searchResults.map((result: Collection) => (
                    <Link key={result.id} href={`/movie/${result.id}`}>
                      <li className='px-4 flex flex-row gap-x-4 py-2 hover:bg-gray-700  cursor-pointer'>
                        {result.poster_path ? (
                          <Image
                            src={TMDB_IMAGE_PATH + result.poster_path}
                            width={100}
                            height={100}
                            alt={result.name}
                          />
                        ) : (
                          <div className='h-[100px] w-[100px] bg-gray-700 rounded-md flex items-center justify-center p-5 text-white text-center'>
                            No image available
                          </div>
                        )}
                        <div className='text-gray hover:text-yellow-500'>
                          {result.name}
                        </div>
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <Button
            variant='outline'
            className='bg-gray-800 border-gray-700'
            onClick={async () => {
              const input = document.querySelector('input')
              const search = input?.value
              if (search && search.length) {
                handleSearch(search)
              } else {
                alert('Please enter a search query')
              }
            }}
          >
            <Search className='w-5 h-5' />
          </Button>
        </div>
        <div className='space-x-4'>
          <Button
            variant='link'
            className='text-white'
            onClick={() => {
              if (path === '/') {
                document
                  .getElementById('popular')
                  ?.scrollIntoView({ behavior: 'smooth' })
              } else {
                router.push('/')
              }
            }}
          >
            {path === '/' ? 'Popular now' : 'Home'}
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header
