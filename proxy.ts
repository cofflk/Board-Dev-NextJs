// middleware

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// logger
import { logger, adminLogger } from '@/libs/logger';

import { detectDevice } from './middleware/detectDevice'
import { validateToken } from './middleware/validateToken'

const loginUrl = process.env.NEXT_PUBLIC_LOGIN_URL || 'https://login.haeahn.com/logout';

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    // //   return NextResponse.redirect(new URL('/home', request.url))
    // const { success, data } = await validateToken(request);

    const pathname = request.nextUrl.pathname;

    if (process.env.NODE_ENV === 'development') {
        return NextResponse.next();
    }

    // 정적 파일, API 경로, /403 페이지는 미들웨어 검증 제외
    if (
        pathname.startsWith('/_next') ||
        // pathname.startsWith('/api') ||
        pathname.startsWith('/static') ||
        pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|css|js)$/) ||
        pathname === '/403' ||
        pathname === '/404'
    ) {
        return NextResponse.next();
    }
    
    // 1. device 체크
    await detectDevice(request);
        // - login, logout, find-pw 경로는 토큰 인증 제외
        const whitelistStr = process.env.WHITELIST_URL || '';
        const excludedPaths = whitelistStr.split(',').map(path => path.trim()).filter(Boolean);
        const isExcluded = excludedPaths.some((path) => pathname.startsWith(path));
        if (isExcluded) {
            return NextResponse.next();
    }
    
    // // 2. 토큰 인증 (재발급 시 hac 쿠키가 붙은 NextResponse를 반환할 수 있음)
    // const { success: authSuccess, empNo = '', roles = '', nextResponse: authNextResponse } = await validateToken(request);

    // if (!authSuccess) {
    //     logger.warn({ category: 'middleware', location: 'proxy.ts', msg: 'token validation failed', pathname, empNo, roles });
    //     return NextResponse.redirect(new URL(loginUrl, request.url));
    // }
    // logger.info({ category: 'middleware', location: 'proxy.ts', msg: 'token validation success', pathname, empNo, roles });

    // const continueResponse = authNextResponse ?? NextResponse.next();
    // if (pathname.startsWith('/admin')) {
    //     if (roles.includes('ROLE_SYS_ADMIN') || roles.includes('ROLE_BOARD_ADMIN')) {
    //         adminLogger.info({ category: 'middleware', location: 'proxy.ts', msg: 'admin user access /admin page', pathname, empNo, roles });
    //         return continueResponse;
    //     }
    //     else {
    //         logger.warn({ category: 'middleware', location: 'proxy.ts', msg: 'user access denied', pathname, empNo, roles });
    //         return NextResponse.redirect(new URL('/404', request.url));
    //     }
    // }
    // else {
    //     return NextResponse.redirect(new URL('/404', request.url));
    // }    
    // return continueResponse;


    return NextResponse.next();

    // return NextResponse.redirect(new URL('/403', request.url));
    // if (request.nextUrl.pathname.startsWith('/about')) {
    //     // This logic is only applied to /about
    //   }
}
 
// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }
 
export const config = {
    // matcher: '/about/:path*',

    // 모든 경로
    // matcher: '/:path*',

    /*
      아래 경로는 제외
      - api
      - next 내부 리소스
      - 정적파일
    */
    // matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)',]
    matcher: [
        '/((?!api|_next/static|_next/image|.*\\.png$|.*\\.svg$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.webp$|.*\\.ico$|.*\\.css$|.*\\.js$|.*\\.map$).*)',
      ],
}