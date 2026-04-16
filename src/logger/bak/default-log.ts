// import pino from "pino";
// import { join } from 'path';

// const isDev = process.env.NODE_ENV === 'development';

// const logPath = process.env.LOG_PATH || 'logs';
// const appName = process.env.APP_NAME || 'app';

// // const transport = pino.transport({
// //     target: 'pino-roll',
// //     options: { 
// //         // file: join(logPath, appName, 'default', 'YYYYMMDD.log'), 
// //         file: join(logPath, appName, 'default'), 
// //         size: '5g', // k, m, g // 100 = 100MB
// //         frequency: 'daily', // daily, hourly, 1000 = 1000ms
// //         extension: '.log.gz',
// //         mkdir: true,
// //         dateFormat: 'yyyyMMdd' // yyyy-MM-dd -> error.2026-01-13.log
// //     }
// // });
  
// // const createTransport = (target: string, options: any) => {
// const createTransport = (fileName: string) => ({
//     target: 'pino-roll',
//     options: { 
//         file: join(logPath, appName, fileName), 
//         size: '1g', // k, m, g // 100 = 100MB
//         frequency: 'daily', // daily, hourly, 1000 = 1000ms
//         extension: '.log.gz',
//         mkdir: true,
//         dateFormat: 'yyyyMMdd' // yyyy-MM-dd -> error.2026-01-13.log
//     }
// })

// const errorTransport = {
//     ...createTransport('error'),
//     level: 'error',
// }


// const transport = pino.transport({
//     targets: [
//         {

//         },
//         {
//             target: 'pino-roll',
//             options: { 
//                 // file: join(logPath, appName, 'default', 'YYYYMMDD.log'), 
//                 file: join(logPath, appName, 'default'), 
//                 size: '5g', // k, m, g // 100 = 100MB
//                 frequency: 'daily', // daily, hourly, 1000 = 1000ms
//                 extension: '.log.gz',
//                 mkdir: true,
//                 dateFormat: 'yyyyMMdd' // yyyy-MM-dd -> error.2026-01-13.log
//             }
//         }
//     ]

// });
  

// export const defaultLogger = pino(transport);