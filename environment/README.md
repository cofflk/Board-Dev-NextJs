### 우선순위
1. .env.local > .env.${NODE_ENV}.local > .env.${NODE_ENV} > .env

### 설정파일
1. /.env.local : 개발자 로컬 환경 설정

2. /.env : 모든 환경에서 동일하게 사용
NODE_ENV=production
APP_NAME=
APP_LOCALE=

3. /environmenet : 개발/운영 설정, 추가 설정 분리 경로

3.1. .env.development, .env.production

# logging
LOG_PATH="/logs/frontend/"

# server
DOMAIN=
PORT=

# service - frontend
NEXT_PUBLIC_LOGIN_URL=
NEXT_PUBLIC_HUB_URL=
NEXT_PUBLIC_MIS_URL=
NEXT_PUBLIC_MNG_URL=

# service - api backend
NEXT_PUBLIC_BE_AUTH_URL=
NEXT_PUBLIC_BE_COMMON_URL=
NEXT_PUBLIC_BE_WORK_URL=
