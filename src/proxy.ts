import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname
    const ispublicPath = path === '/login' || path === '/signup'
    const token = request.cookies.get("token")?.value || ""
    if(ispublicPath && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }
    if(!ispublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

}
 

 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    '/verifyemail'
  ]
}