// middleware test2
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middlewareExample(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    if (
        pathname.startsWith('/middleware')
    ) {
        console.log("middleware test2 '/middleware', ", pathname);
        return NextResponse.next();
    }
    console.log("middleware test2 not '/middleware', ", pathname);
}