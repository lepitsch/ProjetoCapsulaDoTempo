import { EmptyMemories } from '@/components/EmptyMemories'
import { api } from '@/lib/api'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import { ArrowRight } from 'lucide-react'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'

dayjs.locale(ptBr)

interface Memory {
  id: string
  coverUrl: string
  content: string
  createdAt: string
  excerpt: string
}

export default async function Home() { 
  const isAuthenticaded = (await cookies()).has('token')

  if (!isAuthenticaded) {
    return <EmptyMemories />
  }

  const token = (await cookies()).get('token')?.value
  const response = await api.get('/memories', {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })

  const memories: Memory[] = response.data

  if (memories.length == 0) {
    return <EmptyMemories />
  }
  
  return (
    <div className='flex flex-col gap-10 p-8'>
      {memories.map(memory => {
        return (
          <div key={memory.id} className='space-y-4'>
            <time className='flex items-center gap-2 text-sm text-gray-100 -ml-8 before:h-px before:w-5 before:bg-gray-50'>
              {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
            </time>
            <Image src={memory.coverUrl} width={592} height={280} className='w-full aspect-video object-cover rounded-lg' alt=""/>
            <p className='text-lg leading-relaxed text-gray-100'>
              {memory.excerpt}
            </p>
            <Link href={`/memories/${memory.id}`} className='flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100'>
              Ler mais 
              <ArrowRight className='w-4 h-4' />
            </Link>
           
          </div>
        )
      })}
    </div>
  )
}
