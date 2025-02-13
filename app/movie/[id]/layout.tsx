import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Movie Title',
  description: 'Your one stop movie hub',
}

export default function MovieDetailsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div>{children}</div>
}
