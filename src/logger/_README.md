### 로깅 라이브러리
##### 공식문서(https://getpino.io/)

pino : ELK 연계 고려, 성능 우수
pino-roll : rolling 설정
pino-pretty : 포맷팅

pnpm add pino pino-roll
pnpm add -D pino-pretty



###### 사용방법
```ts
logger.info('logger test');
logger.info({ msg: 'logger test' });
logger.error('logger error');

// nextjs dev 모드 등 로그 등록 안되는 경우
// logger.info('logger test');
// logger.flush(); 
```

### 참고
###### Custom Level
```ts
import pino from 'pino';

const levels = {
  emerg: 80,
  alert: 70,
  crit: 60,
  error: 50,
  warn: 40,
  notice: 30,
  info: 20,
  debug: 10,
};

const logger = pino({
  level: process.env.PINO_LOG_LEVEL || 'info',
  customLevels: levels,
  useOnlyCustomLevels: true,
});

export default logger;
```