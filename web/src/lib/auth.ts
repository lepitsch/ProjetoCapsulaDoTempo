import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'

interface User {
  sub: string,
  name: string,
  avatarUrl: string,
}

export async function getUser(): Promise<User> {
  const token = (await cookies()).get('token')?.value

  if (!token) {
    throw new Error ('Unauthenticated.')
  }

  const user: User = jwtDecode(token)

  return user
}