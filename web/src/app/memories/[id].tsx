import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function MemoryDetail() {
  const router = useRouter();
  const { id } = router.query; // Pega o ID da memória a partir da URL

  const [memory, setMemory] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Busca a memória no backend
      fetch(`/api/memories/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${'token'}`, // Substitua com sua lógica de autenticação
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

  return (
    <div className="container mx-auto mt-10 p-4 bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-white">{memory.title || 'Memória'}</h1>
      <p className="mt-4 text-gray-300">{memory.content}</p>
      {memory.imageUrl && (
        <img
          src={memory.imageUrl}
          alt="Imagem da Memória"
          className="mt-4 rounded-lg w-full"
        />
      )}
      <button
        onClick={() => router.back()}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Voltar
      </button>
    </div>
  );
}