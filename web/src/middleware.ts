import { NextRequest, NextResponse } from "next/server";

const signInURL = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`;

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    // Redireciona o navegador para a URL de login do GitHub
    const redirectResponse = NextResponse.redirect(signInURL);

    redirectResponse.headers.set(
      'Set-Cookie',
      `redirectTo=${request.url}; Path=/; HttpOnly; Secure; max-age=300;`,
    );

    return redirectResponse;
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/memories/:path*',
};