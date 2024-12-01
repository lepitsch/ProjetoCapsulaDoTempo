import { NextRequest, NextResponse } from "next/server";

const signInURL = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`;

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(signInURL, {
      headers: {
        'Set-Cookie': `redirectTo=${request.url}; Path=/; HttpOnly; Secure; max-age=300;`,
        'Access-Control-Allow-Origin': '*', // Permite que qualquer origem acesse
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // Métodos permitidos
        'Access-Control-Allow-Headers': 'Content-Type, Authorization', // Cabeçalhos permitidos
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/memories/:path*',
};