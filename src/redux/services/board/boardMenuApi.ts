import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from '@/config';

export const boardMenuApi = createApi({
    reducerPath: 'boardMenuApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${config.beCommonUrl}`,
    }),
    // 1. 사용할 태그 이름들을 미리 정의합니다.
    tagTypes: ['BoardMenuList'], 

    endpoints: (builder) => ({
        // 메뉴 목록
        getMenus: builder.query({
            query: () => '/menus',
            providesTags: ['BoardMenuList'],
        }),
        // 메뉴 상세정보
        getMenuById: builder.query({
            query: (id) => `/menus/${id}`,
            providesTags: (result, error, id) => [{ type: 'BoardMenuList', id }],
        }),
    }),
});
export const { useGetMenusQuery, useGetMenuByIdQuery } = boardMenuApi;