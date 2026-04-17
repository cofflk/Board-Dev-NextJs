import { NextResponse } from 'next/server';
import { config } from '@/config';
// logger
import { logger } from '@/logger';

export async function GET() {
    try {
        // 1. portal menu
        const portalRes = await fetch(`${config.beCommonUrl}/portal/menu`, {
            cache: 'no-store',
            headers: {
                'X-Service-Id': `${config.appName}`,
                'X-Service-Name': `${config.appName}`,
            },
            credentials: 'include',
        });

        if (!portalRes.ok) {
            throw new Error('portalmenu fetch 실패');
        }
        const portalMenus = await portalRes.json();

        // 2. board menu
        const mergedData = await Promise.all(
            portalMenus.map(async (menu: any) => {
                try {
                    const boardRes = await fetch(`${config.beCommonUrl}/board/menu/${menu.menuCode}`, {
                        cache: 'no-store',
                        headers: {
                            'X-Service-Id': `${config.appName}`,
                            'X-Service-Name': `${config.appName}`,
                        },
                        credentials: 'include',
                    });

                    if (!boardRes.ok) {
                        return {
                        ...menu,
                        boardmenu: null,
                        };
                    }
                    const boardMenu = await boardRes.json();
                    return {
                        ...menu,
                        boardmenu: boardMenu,
                    };
                } catch (err) {
                    return {
                      ...menu,
                      boardmenu: null,
                    };
                }
            })
        );
        return NextResponse.json({
            data: mergedData,
        });
    } catch (err) {
        logger.error({ category: 'api', location: '/app/api/menu/route.ts', msg: 'menu fetch 실패', error: err });
        return NextResponse.json({
            error: 'menu fetch 실패',
        }, { status: 500 });
    }
}