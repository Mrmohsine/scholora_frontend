// middleware.ts (à la racine du projet)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value || 
                request.headers.get('authorization')?.replace('Bearer ', '');

  // Routes protégées
  const protectedRoutes = {
    '/admin': ['super_admin'],
    '/student-portal': ['student'],
    '/tutor-portal': ['tutor']
  };

  // Vérifier si la route nécessite une protection
  const currentPath = request.nextUrl.pathname;
  const protectedRoute = Object.keys(protectedRoutes).find(route => 
    currentPath.startsWith(route)
  );

  if (protectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // TODO: Vérifier le rôle du token (nécessite un décodage JWT)
    // Pour l'instant, redirection vers login pour re-vérification
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/student-portal/:path*', '/tutor-portal/:path*']
};