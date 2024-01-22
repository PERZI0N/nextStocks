'use client'
import Navbar from '@/components/Navbar'
import Image from 'next/image'
import { useQuery } from 'react-query'

export default function Home() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('https://api.github.com/repos/TanStack/query').then(
        (res) => res.json(),
      ),
  })

  if (isLoading) return 'Loading...'
  return (
   <div>
      <div>
        page
      </div>
   </div>
  )
}
