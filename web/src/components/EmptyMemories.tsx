import Cookie from 'js-cookie';

export function EmptyMemories() {
  const token = Cookie.get('token')
  return (
    <div className="flex flex-1 items-center justify-center p-16">
      <p className="w-[360px] text-center leading-relaxed">
        Você ainda não registrou nenhuma memória, comece a {''}
        <a href={`${token? 'memories/new' : `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`}`} className="underline hover:text-gray-50">
          criar agora
        </a>
        !
      </p>
    </div>
  )
}