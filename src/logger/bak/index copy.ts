// export * from './default-log';
// // export * from './error-log';

import pino from "pino";
import { join } from 'path';

if (process.env.NEXT_PUBLIC_APP_ENV !== 'localhost') {
    await import('pino-pretty');
}

// const isDev = process.env.NODE_ENV === 'development';
const isDev = false;

const logPath = process.env.LOG_PATH || 'logs';
const appName = process.env.APP_NAME || 'app';

// const transport = pino.transport({
//     target: 'pino-roll',
//     options: { 
//         // file: join(logPath, appName, 'default', 'YYYYMMDD.log'), 
//         file: join(logPath, appName, 'default'), 
//         size: '5g', // k, m, g // 100 = 100MB
//         frequency: 'daily', // daily, hourly, 1000 = 1000ms
//         extension: '.log.gz',
//         mkdir: true,
//         dateFormat: 'yyyyMMdd' // yyyy-MM-dd -> error.2026-01-13.log
//     }
// });


// 1. 공통 옵션
const baseOptions: pino.LoggerOptions = {
    level: process.env.LOG_LEVEL || 'info',
    timestamp: pino.stdTimeFunctions.isoTime,
    formatters: {
        level: (label: string) => ({ level: label.toUpperCase() }), // 레벨을 대문자로 (INFO, ERROR)
    },
}

// 2. file target 생성
const createFileTarget = (fileName: string, level: pino.Level = 'info') => ({
    target: 'pino-roll',
    level,
    options: {
        file: join(logPath, appName, fileName), 
        size: '1g', // k, m, g // 100 = 100MB
        frequency: 'daily', // daily, hourly, 1000 = 1000ms
        mkdir: true,
        dateFormat: 'yyyyMMdd', // yyyy-MM-dd -> error.2026-01-13.log
        extension: '.log',
    },
});

// 3. transport 구성 - singleton pattern
const targets: pino.TransportTargetOptions[] = [];

if (isDev) {
    targets.push({
        target: 'pino-pretty',
        level: 'debug',
        options: { 
            colorize: true, 
            translateTime: 'SYS:standard', 
            ignore: 'pid,hostname' 
        },
    });
}
else {
    targets.push(createFileTarget('default', 'info'));
    targets.push(createFileTarget('admin', 'info'));
    targets.push(createFileTarget('error', 'error'));

    // 컨테이너 환경(AWS, K8s) 대응을 위해 stdout 추가
    targets.push({
        target: 'pino/file', // 기본 stdout
        level: 'info',
        options: { destination: 1 } 
    });
}
const transport = pino.transport({ targets });

// 4. 인스턴스 분리 (Child Logger 활용 권장)
// 별도의 pino() 호출보다 base logger에서 child를 만드는 것이 더 가볍습니다.
// const baseLogger = pino(baseOptions, transport);

// export const logger = baseLogger.child({ type: 'default' });
// export const adminLogger = baseLogger.child({ type: 'admin' });

const baseLogger = pino(baseOptions, transport);

export const logger = baseLogger.child({ channel: 'default' });
export const adminLogger = baseLogger.child({ channel: 'admin' });

export function getLogger(path = '') {
  return path.startsWith('/admin') ? adminLogger : logger;
}

// export const logger = pino(baseOptions, pino.transport({
//     targets: [
//       createFileTarget('default', 'info'),
//       createFileTarget('error', 'error'),
//     ],
// }));
  
//   export const adminLogger = pino(baseOptions, pino.transport({
//     targets: [
//       createFileTarget('admin', 'info'),
//       createFileTarget('error', 'error'),
//     ],
// }));

// export function getLogger(path: string = '') {
//     if (path.startsWith('/admin')) {
//       return adminLogger;
//     }
//     return logger;
// }