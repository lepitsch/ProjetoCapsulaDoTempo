import dayjs from 'dayjs';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Memory {
  id: string
  coverUrl: string
  excerpt: string
  createdAt: string
}

export default function MemoryDetail() {
  const router = useRouter();
  const { id } = router.query; // Pega o ID da memória a partir da URL

  const [memory, setMemory] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Busca a memória no backend
      fetch(`/memories/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${'token'}`, 
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Não foi possível carregar a memória.');
          }
          return res.json();
        })
        .then((data) => {
          setMemory(data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError('Erro ao carregar memória.');
          setIsLoading(false);
        });
    }
  }, [id]);

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!memory) {
    return <p>Memória não encontrada.</p>;
  }

  const memories: Memory[] = response.data

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