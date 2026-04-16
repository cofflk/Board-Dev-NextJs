##### 프로젝트 구조

* /app/api: route handler (BFF)

* /src/components: 공통 UI 컴포넌트

* /src/hooks: 공통 hooks

* /src/context: 전역상태 React Context

* /src/libs
    1. /src/libs/config : .env 설정의 custom 값
    2. /li

* /src/context
    1. custom react hooks
    2. 'use client' 필수

* /src/features
    1. domain 별 기능 정의 : components, hooks, types 등
    2. 비즈니스 로직 API 호출, 상태관리 등

##### 설정파일/환경변수
- [README 참고](/environment/README.md)

##### Loggging 
- [README 참고](/src/libs/logger/README.md)


##### Dependencies
<details>
<summary>package.json - 공통 패키지</summary>

```bash
# logger
pnpm add pino pino-roll
pnpm add -D pino pretty

# middleware
# - detect device 
pnpm add react-device-detect

# styles
pnpm add sass
```

```ts

<!-- 전역 상태 관리 -->
redux toolkit
- pnpm add -D
```

1. lodash
    1. data 불변성 유지
    2. 성능 최적화 - throttle, debounce

    ```ts
    pnpm add lodash
    pnpm add -D @types/lodash

    // 1. deep copy
    import { cloneDeep } from 'lodash';
    const newState = cloneDeep(prevState);
    newState.user.profile.name = 'Tom';
    setState(newState);

    // 2. debounce
    import { debounce } from 'lodash';
    const onSearch = debounce((value) => {
    fetchData(value);
    }, 300);

    | 함수           | 사용 이유      |
    | ------------- | ---------     |
    | `debounce`    | 검색, 입력      |
    | `throttle`    | 스크롤, 리사이즈 |
    | `isEqual`     | 객체 비교      |
    | `cloneDeep`   | 깊은 복사      |
    | `get`         | 안전한 접근     |
    | `omit / pick` | props 정리     |
    | `uniqBy`      | 리스트 중복 제거| 
    | `groupBy`     | 데이터 가공     |

    ```

2. RTK - React toolkit
- RTK redux - 전역 상태 관리, zustand 등 대체
- RTK query - 서버 캐싱, 비동기 데이터 관리 > tanstack query 대체 가능

    ```ts
    pnpm add @reduxjs/toolkit react-redux


    ```
</details>



##### 실행 로직
1. middleware : /proxy.ts




##### nextjs upgrade
[nextjs](https://nextjs.org/docs/app/getting-started/upgrading#latest-version)