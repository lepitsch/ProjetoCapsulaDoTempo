import { Copyright } from "@/components/Copyright";
import { Hero } from "@/components/Hero";
import { Profile } from "@/components/Profile";
import { SignIn } from "@/components/SignIn";
import type { Metadata } from "next";
import { Bai_Jamjuree as BaiJamjuree, Roboto_Flex as Roboto } from 'next/font/google';
import { cookies } from "next/headers";
import "./globals.css";

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const baiJamjuree = BaiJamjuree({ subsets: ['latin'], weight: '700', variable: '--font-bai-jamjuree' })

export const metadata: Metadata = {
  title: "Cápsula do Tempo",
  description: "Uma cápsula do tempo para armazenar memórias",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  const isAuthenticated = cookies().has('token')

  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${baiJamjuree.variable} bg-gray-900 font-sans text-gray-100`}
      >
        
        <main className="grid min-h-screen grid-cols-2">
          {/*Esquerda*/}
          <div className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 px-28 py-16">
            {/*Blur*/}
            <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-green-700 opacity-50 blur-full"></div>

            {/*Stripes*/}
            <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes" />

            {isAuthenticated ? <Profile /> : <SignIn />}
            <Hero />
            <Copyright />

          </div>

          {/*Direita*/}
          <div className="flex flex-col p-16">
          {children}
          </div>
        </main>
      </body>
    </html>
  );
}
