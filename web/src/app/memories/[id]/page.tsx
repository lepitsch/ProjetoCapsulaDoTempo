import { api } from '@/lib/api';
import { cookies } from 'next/headers'; // Para obter cookies na app directory
import { redirect } from 'next/navigation';
import MemoryDetails from './MemoryDetails';

interface MemoryPageProps {
  params: { id: string };
}

export default async function MemoryPage({ params }: MemoryPageProps) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return redirect('/');
  }

  try {
    const { id } = params; // Aqui não é necessário usar `await`, porque `params` já é um objeto

    const response = await api.get(`/memories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return <MemoryDetails memory={response.data} token={token} />;
  } catch (error) {
    console.error('Erro ao buscar memória:', error);
    return redirect('/');
  }
}
