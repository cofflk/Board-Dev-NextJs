// middleware - login token validation
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { isMobile } from 'react-device-detect';
import { logger } from '@/logger';

export async function detectDevice(request: NextRequest) {
    const { pathname, search } = request.nextUrl;

    // 1. desktop 에서 /m 경로 접속 시, mobile 로 리다이렉트
    if (pathname.startsWith('/m')) {
        if (!isMobile) {
            // logger.warn({ category: 'middleware', location: '/middleware/detectDevice.ts', msg: 'desktop access mobile path', pathname });
            const newPath = pathname.replace(/^\/m/, '') || '/';
            const url = request.nextUrl.clone();
            url.pathname = newPath;
            url.search = search;
      
            return NextResponse.redirect(url);
        }
    }

    // 2. mobile 에서 / 경로 접속 시, /m 로 리다이렉트
    if (isMobile) {
        // logger.warn({ category: 'middleware', location: '/middleware/detectDevice.ts', msg: 'mobile access desktop path', pathname });
        const url = request.nextUrl.clone();
        url.pathname = `/m${pathname}`;
        url.search = search;

        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}
