import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from '@/config';

export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${config.beCommonUrl}`,
    }),
    // 1. 사용할 태그 이름들을 미리 정의합니다.
    tagTypes: ['PostList'], 

    endpoints: (builder) => ({
        getPosts: builder.query({
        query: () => '/posts',
        // 2. 이 데이터에 'Posts' 태그를 붙입니다.
        providesTags: ['PostList'],
        }),
        addPost: builder.mutation({
        query: (body) => ({
            url: '/posts',
            method: 'POST',
            body,
        }),
        // 3. POST 성공 시 'Posts' 태그를 가진 캐시를 무효화합니다.
        invalidatesTags: ['PostList'],
        }),
    }),
});