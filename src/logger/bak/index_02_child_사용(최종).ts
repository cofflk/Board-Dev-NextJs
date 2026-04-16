import pino from "pino";
import { join } from 'path';

// if (process.env.NEXT_PUBLIC_APP_ENV !== 'localhost') {
//     await import('pino-pretty');
// }

// const isDev = process.env.NODE_ENV === 'development';
const isDev = false;

const logPath = process.env.LOG_PATH || join(process.cwd(), 'logs');
const appName = process.env.APP_NAME || 'app-dev';

// 1. 공통 옵션
const baseOptions: pino.LoggerOptions = {
    name: appName,
    level: process.env.LOG_LEVEL || (isDev ? 'debug' : 'info'),
    // timestamp: pino.stdTimeFunctions.isoTime,
    timestamp: () => `,"timestamp":"${new Date(Date.now()).toISOString()}"`,
    formatters: {
        // return 시 level 이 없으면 오류 발생
        level (label: pino.LevelOrString, number: number) { return { level: number, label: label.toUpperCase() }; }, // 레벨을 대문자로 (INFO, ERROR)
        bindings: (bindings) => {
            return {
                pid: bindings.pid,
                hostname: bindings.hostname,
                // node_version: process.version,
            };
        }
    },
    // sensitive data 제거
    // redact: ['req.headers.authorization', 'password', 'card_number'],
    redact: {
        paths: ['req.headers.authorization', 'req.headers.X-Refresh-Token', 'hidden'],
        // censor: 해당 문자열로 대체하여 로그에 표시, remove: 해당 값을 제거
        censor: '********', // 숨김 문자열
        // remove: true, // 제거 여부
    }
}

// 2. file target 생성
const createFileTarget = (fileName: string, level: pino.Level = 'info') => ({
    target: 'pino-roll',
    level,
    options: {
        // file: join(logPath, appName, fileName), 
        file: join(logPath, appName, `${fileName}/${fileName}.log`),
        // size: '1g', // k, m, g // 100 = 100MB
        frequency: 'daily', // daily, hourly, 1000 = 1000ms
        mkdir: true,
        dateFormat: 'yyyyMMdd-hh', // yyyy-MM-dd -> error.2026-01-13.log
        limit: { count: 30 }, // Keep up to 15 rotated files + 1 active file
        // extension: '.log',
        compress: true,
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

    // // 컨테이너 환경(AWS, K8s) 대응을 위해 stdout 추가

    // 운영 환경: 파일 + 표준 출력(stdout) 병행 권장
    // - 표준 출력 (CloudWatch, Datadog 등이 읽어감)
    targets.push({
        target: 'pino/file', // 기본 stdout
        level: 'info',
        options: { destination: 1 } 
    });
}


// 4. 인스턴스 분리 (Child Logger 활용 권장)
// const transport = pino.transport({ targets });
// 별도의 pino() 호출보다 base logger에서 child를 만드는 것이 더 가볍습니다.
// const baseLogger = pino(baseOptions, transport);

// export const logger = baseLogger.child({ type: 'default' });
// export const adminLogger = baseLogger.child({ type: 'admin' });

// singleton pattern
const transport = pino.transport({ targets });
const baseLogger = pino(baseOptions, transport);
// const baseLogger = pino({
//     // // Configure timestamp format (optional, ISO is standard)
//     // timestamp: pino.stdTimeFunctions.isoTime,
//     // // Set the minimum logging level (can be overridden per target)
//     // level: process.env.PINO_LOG_LEVEL || 'info',
// }, transport);

export const logger = baseLogger.child({ channel: 'default' });
export const adminLogger = baseLogger.child({ channel: 'admin' });

export function getLogger(path = '') {
  return path.startsWith('/admin') ? adminLogger : logger;
}

// export function getLogger(path: string = '') {
//     if (path.startsWith('/admin')) {
//       return adminLogger;
//     }
//     return logger;
// }