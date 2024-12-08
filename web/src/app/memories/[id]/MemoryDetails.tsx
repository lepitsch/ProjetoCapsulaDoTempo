'use client'

import { api } from '@/lib/api'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

dayjs.locale(ptBr)

interface Memory {
  id: string
  coverUrl: string
  content: string
  createdAt: string
}

interface MemoryDetailsProps {
  memory: Memory
  token: string
}

export default function MemoryDetails({ memory, token }: MemoryDetailsProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [content, setContent] = useState(memory.content)

  const handleDelete = async () => {
    const confirmed = confirm('Tem certeza que deseja excluir esta memória?')
    if (confirmed) {
      try {
        await api.delete(`/memories/${memory.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        alert('Memória excluída com sucesso!')
        window.location.href = '/' // Redireciona para a página inicial
      } catch (error) {
        console.error('Erro ao excluir memória:', error)
      }
    }
  }

  const handleEdit = async () => {
    try {
      await api.put(
        `/memories/${memory.id}`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      alert('Memória atualizada com sucesso!')
      setIsEditing(false)
      memory.content = content
    } catch (error) {
      console.error('Erro ao editar memória:', error)
    }
  }

  return (
    <div className="flex flex-col max-w-4xl mx-auto p-8">
      <Link href="/" className="flex items-center text-sm text-gray-200 hover:text-gray-100">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar
      </Link>
      <div className="space-y-4 mt-6">
        <time className="text-sm text-gray-100">
          {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
        </time>
        <Image
          src={memory.coverUrl}
          width={800}
          height={400}
          className="w-full aspect-video object-cover rounded-lg"
          alt="Imagem da memória"
        />
        {isEditing ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-4 text-lg leading-relaxed text-gray-900 bg-gray-200 rounded-lg"
          />
        ) : (
        <p className="max-w-full break-words text-lg leading-relaxed text-gray-100">
          {memory.content}
        </p>
        )}
        <div className="flex gap-4">
          {isEditing ? (
            <>
              <button
                onClick={handleEdit}
                className="px-4 py-2 text-sm text-white bg-green-500 rounded-lg hover:bg-green-600"
              >
                Salvar
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-sm text-white bg-gray-500 rounded-lg hover:bg-gray-600"
              >
                Cancelar
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Editar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600"
              >
                Excluir
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
