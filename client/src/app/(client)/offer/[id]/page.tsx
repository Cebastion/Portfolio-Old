'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { FC } from 'react'

const page: FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  return <div>page {searchParams.get('id')}</div>
}

export default page