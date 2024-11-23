import { Copyright } from '@/components/Copyright'
import { EmptyMemories } from '@/components/EmptyMemories'
import { Hero } from '@/components/Hero'
import { SignIn } from '@/components/SignIn'

export default function Home() {
  return (
    <main className="grid min-h-screen grid-cols-2">
      {/*Esquerda*/}
      <div className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 px-28 py-16">
        {/*Blur*/}
        <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-green-700 opacity-50 blur-full"></div>

        {/*Stripes*/}
        <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes"/>

        <SignIn />
        <Hero />
        <Copyright />

      </div>

      {/*Direita*/}
      <div className="flex flex-col p-16">
        <EmptyMemories />
      </div>
    </main>
  )
}
