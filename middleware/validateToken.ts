// middleware - login token validation
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { isMobile } from 'react-device-detect';
import { logger } from '@/logger';

// 인증 예외 IP
const WHITELIST_IP = ['127.0.0.1', 'localhost']
const serviceId = process.env.APP_NAME || '';

type ValidateTokenResult = {
    success: boolean;
    empNo?: string;
    roles?: string;
    /** 재발급 시 브라우저에 hac 쿠키 추가를 위해 proxy에서 그대로 반환 */
    nextResponse?: NextResponse;
};
// export async function validateToken(request: NextRequest) {
export async function validateToken(request: NextRequest): Promise<ValidateTokenResult> {
    const pathname = request.nextUrl.pathname;
    // const url = process.env.NEXT_PUBLIC_BE_AUTH_URL;
    let url = process.env.NEXT_PUBLIC_BE_AUTH_URL;    
    if (!url) {
        logger.warn({ category: 'middleware', location: '/middleware/validateToken.ts', msg: 'url not found', pathname });
        return { success: false };
    }

    let clientIp =
        request.headers.get('x-forwarded-for')?.split(',')[0] ||
        request.headers.get('x-real-ip') ||
        '127.0.0.1'
    
    if (process.env.NODE_ENV === 'development') {
        url = 'http://hubnx.be.haeahn.com/auth';
        clientIp = '192.168.3.115';
    }

    if (WHITELIST_IP.includes(clientIp)) {
        logger.warn({ category: 'middleware', location: '/middleware/validateToken.ts', msg: 'whitelist ip', pathname });
        return { success: true };
        
        // 접근이 허용되지 않은 IP일 경우, 403으로
        // return NextResponse.redirect(new URL('/403', req.url))
    }

    const hsession = request.cookies.get('hsession')?.value;
    const hrf = request.cookies.get('hrf')?.value;

    if (!hsession || !hrf) {
        logger.warn({ category: 'middleware', location: '/middleware/validateToken.ts', msg: 'hsession or hrf not found', pathname });
        return { success: false };
    }

    let nextResponse: NextResponse | undefined;

    const hac = request.cookies.get('hac')?.value;
    // access token 없으면 재발급 요청

    let isValid = false;
    let empNo = '';
    let roles = '';

    if (!hac) {
        logger.warn({ category: 'middleware', location: '/middleware/validateToken.ts', msg: 'access token not found', url, clientIp });

        const reissue = await reissueAccessToken(request, url, clientIp);
        isValid = reissue.success;
        empNo = reissue.data?.empNo;
        roles = reissue.data?.roles;
        nextResponse = reissue.nextResponse;

        if (!reissue.success) {
            logger.error({ category: 'middleware', location: '/middleware/validateToken.ts', msg: 'access token not found, reissue access token failed', url, clientIp, data: reissue.data });
        }
    }
    else {
        const { success, data } = await validateAccessToken(request, url, clientIp);
        isValid = success;
        empNo = data?.empNo;
        roles = data?.roles;
        
        if (isValid) {
            logger.info({ category: 'middleware', location: '/middleware/validateToken.ts', msg: 'access token validated success', url, clientIp, data });
        }
        else {
            const reissue = await reissueAccessToken(request, url, clientIp);
            isValid = reissue.success;
            empNo = reissue.data?.empNo;
            roles = reissue.data?.roles;
            nextResponse = reissue.nextResponse;

            if (isValid) {
                logger.info({ category: 'middleware', location: '/middleware/validateToken.ts', msg: 'reissue access token success', url, clientIp, data: reissue.data });
            }
            else {
                logger.error({ category: 'middleware', location: '/middleware/validateToken.ts', msg: 'reissue access token failed', url, clientIp, data: reissue.data });
            }
        }
    }

    if (!isValid) return { success: false };
    return { success: true, empNo, roles, nextResponse };
}

// access token 검증
async function validateAccessToken(request: NextRequest, url: string, clientIp: string) {
    const deviceType = isMobile ? 'mobile' : 'desktop';
    const hsession = request.cookies.get('hsession')?.value || '';
    const hac = request.cookies.get('hac')?.value || '';

    const res = await fetch(`${url}/api/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Device-Type': deviceType,
            'X-Client-IP': clientIp,
            'X-Session-Id': hsession,
            'Authorization': 'Bearer ' + hac,
            'X-Service-Id': serviceId,
        },
        // credentials: "include",
    });

    if (!res.ok) return { success: false };
    const data = await res.json();
    if (data.message !== "OK") return { success: false };
    return { success: true, data };
}

// access token 재발급
async function reissueAccessToken(request: NextRequest, url: string, clientIp: string) {
    const deviceType = isMobile ? 'mobile' : 'desktop';
    const hsession = request.cookies.get('hsession')?.value || '';
    const hrf = request.cookies.get('hrf')?.value || '';

    const res = await fetch(`${url}/api/reissue/access`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Device-Type': deviceType,
            'X-Client-IP': clientIp,
            'X-Session-Id': hsession,
            'X-Refresh-Token': hrf,
            'X-Service-Id': serviceId,
        },
        // credentials: "include",
    });

    if (!res.ok) return { success: false };
    
    // access token 등록
    const accessTokenHeader = res.headers.get('Authorization');
    if (!accessTokenHeader || !accessTokenHeader.startsWith('Bearer ')) return { success: false };
    
    const accessToken = accessTokenHeader.replace(/^Bearer\s+/i, '');
    const data = await res.json();

    if (data.message !== "OK") return { success: false };

    // 재발급 시 브라우저에 hac 쿠키를 심기 위해 proxy에서 그대로 반환해야 함
    const response = NextResponse.next();
    const maxAgeSec = Number(data.expiration);
    const finalMaxAge = Number.isFinite(maxAgeSec) ? maxAgeSec * 60 : 600;
    
    // // Secure 쿠키는 HTTPS에서만 저장됨.
    // //  http://board.haeahn.com 로컬 dev 등에서는 API가 secure=true여도 거부되므로 실제 전송 계층 기준으로 맞춤.
    // const forwardedProto = request.headers.get('x-forwarded-proto')?.split(',')[0]?.trim();
    // const isHttps = request.nextUrl.protocol === 'https:' || forwardedProto === 'https';
    // const apiWantsSecure = String(data.secure) === 'true';
    
    response.cookies.set({
        name: 'hac',
        value: accessToken,
        // API 응답이 "true"(문자열)인지 true(Boolean)인지 확실하지 않을 때를 대비
        httpOnly: String(data.httpOnly) === 'true', 
        // secure: apiWantsSecure && isHttps,
        secure: (process.env.NODE_ENV === 'development') ? false : (String(data.secure) === 'true'),
        sameSite: 'lax',
        path: '/',
        maxAge: finalMaxAge,
    });
    response.headers.set('Authorization', `Bearer ${accessToken}`);
    return { success: true, data, nextResponse: response };
}