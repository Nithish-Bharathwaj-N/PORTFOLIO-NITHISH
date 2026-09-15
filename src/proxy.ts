import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    return NextResponse.next();
}

// Optionally, configure the middleware to run only on specific paths
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - any public assets (e.g., images, fonts)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
    ],
};
