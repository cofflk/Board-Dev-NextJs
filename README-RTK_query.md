
###### createApi
- 서버데이터 조회

1. reducerPath: 서비스 마운트 고유 키 ( slice name 과 같음 )
2. baseQuery: endpoint 사용할 쿼리 정의
- fetchBaseQuery: fetch wrapper
    - baseUrl: API 경로 설정 (default: 호출 위치의 상대경로)
    - prepareHeaders: 헤더 설정
    - paramsSerializer: 사용자 정의 변환 (default: new URLSearchParams() 사용)
    - timeout: 요청 timeout 설정

- endpoints: (builder) => ({})
    - builder.query: 데이터 조회 쿼리
    - mutation: POST, PUT, DELETE 등 요청
    - subscription: 반환된 콜백 함수에서 실시간 데이터 수신 구독.

- tagTypes: 태그 정의. 캐싱 및 무효화 사용
    - provideTags 사용으로 캐싱  => invalidatesTags 사용으로 무효화

    => 게시글 목록을 캐싱 => 새 글 작성 => 새로 등록된 게시글을 조회하기 위하여, 게시글 목록을 무효화
    => refetch: 태그를 쓰고있는 데이터 query 를 다시 실행해서 최신 데이터 조회



e.g.
- RTK query 가 자동 생성한 hook 사용
    - use{endpoints 의 query name}Qeury
    - use{endpoints 의 mutation name}Mutation
export const { useGetLogonUserQuery } = logonUserApi;


=> page.tsx
import { useGetLogonUserQuery } from '@/redux/services/auth/logonUserApi';
