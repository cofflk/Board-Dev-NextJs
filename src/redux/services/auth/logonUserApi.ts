import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { config } from '@/config';
import { LogonUserResponse, LogonUser } from './types';

export const logonUserApi = createApi({
    reducerPath: 'logonUserApi',
    // endpoint 공통 설정
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${config.beAuthUrl}`,
        prepareHeaders: (headers, { getState }) => {
            // const token = (getState() as RootState).auth.token
            // if (token) {
            //     headers.set('authorization', `Bearer ${token}`)
            // }
            headers.set('X-Service-Id', `${config.appName}`)
            headers.set('X-Service-Name', `${config.appName}`)
            return headers
        },
        credentials: 'include', // 쿠키 포함
    }),
    // tagTypes: ['LogonUser'],
    endpoints: (builder) => ({
        // <응답타입, 요청 파라미터>
      // getLogonUser: builder.query<return type, request type>({
      getLogonUser: builder.query<LogonUser | null, void>({
        // query: (name) => `logonUser/${name}`,
        query: () => ({
          url: 'api/profile',
          method: 'GET',
          // credentials: 'include',
        }),
        transformResponse: (response: LogonUserResponse): LogonUser | null => {
          if (response?.success) {
            return response.data; // 👈 data만 반환
          }
          return null; // or throw error
        },
        async onQueryStarted(_, { queryFulfilled }) {
          try {
            const { data, meta } = await queryFulfilled;
            console.log('[getLogonUser] response data:', data);
            console.log('[getLogonUser] response meta:', meta);
          } catch (error) {
            console.log('[getLogonUser] response error:', error);
          }
        },
      }),
    }),
  })

export const { useGetLogonUserQuery } = logonUserApi;

// const [getLogonUser, { data, isLoading }] = useGetLogonUserQuery()
// await addPost({ title: 'hello' })