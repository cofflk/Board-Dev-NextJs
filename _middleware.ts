// // middleware

// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// import { validateToken } from './middleware/validateToken'

// // This function can be marked `async` if using `await` inside
// export async function middleware(request: NextRequest) {
//     const pathname = request.nextUrl.pathname;
    
//     // 정적 파일, API 경로, /403 페이지는 미들웨어 검증 제외
//     if (
//         pathname.startsWith('/_next') ||
//         pathname.startsWith('/api') ||
//         pathname.startsWith('/static') ||
//         pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|css|js)$/) ||
//         pathname === '/403'
//     ) {
//         return NextResponse.next();
//     }

//     const { success } = await validateToken(request);
//     if (success) {
//         return NextResponse.next();
//     }
//     return NextResponse.redirect(new URL('/403', request.url));
// }

// export const config = {
// //   matcher: '/about/:path*',
//     matcher: '/:path*',

// }

