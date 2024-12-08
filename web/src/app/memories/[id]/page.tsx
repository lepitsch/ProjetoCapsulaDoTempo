import { api } from '@/lib/api'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import MemoryDetails from './MemoryDetails'

export default async function MemoryPage({ params }: { params: { id: string } }) {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) { 
    return redirect('/')
  }

  try {
    const { id } = params

    const response = await api.get(`/memories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return <MemoryDetails memory={response.data} token={token} />
  } catch (error) {
    console.error('Erro ao buscar memória:', error)
    return redirect('/')
  }
}
