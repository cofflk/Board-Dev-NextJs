// export * from './default-log';
// // export * from './error-log';

import pino from "pino";
import { join } from 'path';

const isDev = process.env.NODE_ENV === 'development';

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


const baseOptions = {
    level: process.env.LOG_LEVEL || 'info',
    timestamp: pino.stdTimeFunctions.isoTime,
    formatters: {
        level: (label: string) => ({ level: label.toUpperCase() }), // 레벨을 대문자로 (INFO, ERROR)
    },
}

// 개발환경은 pretty 형식 사용, production 환경은 JSON 형식을 사용.
const devTransport = {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard', // 사람이 읽기 쉬운 시간 포맷
      ignore: 'pid,hostname',        // 불필요한 정보 숨김
    },
};
  
// const createTransport = (target: string, options: any) => {
const createTransport = (fileName: string) => ({
    target: 'pino-roll',
    options: { 
        file: join(logPath, appName, fileName), 
        size: '1g', // k, m, g // 100 = 100MB
        frequency: 'daily', // daily, hourly, 1000 = 1000ms
        extension: '.log',
        mkdir: true,
        dateFormat: 'yyyyMMdd' // yyyy-MM-dd -> error.2026-01-13.log
    }
})

// error 는 별도 파일로 분리
const errorTransport = {
    ...createTransport('error'), level: 'error',
};

// default.log
const defaultTransport = pino.transport({
    targets: [
        { ...createTransport('default'), level: 'info' }, // info 이상은 default.log로
        errorTransport,                                   // error 이상은 error.log로도 복사
    ]
});

// admin.log
const adminTransport = pino.transport({
    targets: [
      { ...createTransport('admin'), level: 'info' }, // info 이상은 admin.log로
      errorTransport,                                 // error 이상은 error.log로도 복사
    ],
});


// loger =================

// Admin 로거
export const adminLogger = pino(
    baseOptions,
    // 개발환경이면 pretty, 아니면 위에서 만든 파일 transport 사용
    // isDev ? undefined : adminTransport 
    isDev ? pino.transport(devTransport) : adminTransport
  );

export const logger = pino(
    baseOptions,
    // isDev ? undefined : defaultTransport
    // isDev ? pino.transport(devTransport) : defaultTransport
    defaultTransport
);

export function getLogger(path: string) {
    if (path.startsWith('/admin')) {
      return adminLogger;
    }
    return logger;
}