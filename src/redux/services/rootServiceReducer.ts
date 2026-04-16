// import { combineReducers } from '@reduxjs/toolkit';
// import { logonUserApi } from './auth/logonUserApi';
// // import { boardMenuApi } from './board/boardMenuApi';

// export const rootServiceReducer = combineReducers({
//   [logonUserApi.reducerPath]: logonUserApi.reducer,
// //   [boardMenuApi.reducerPath]: boardMenuApi.reducer,
// });
// export default rootServiceReducer;
// ================================================

import { logonUserApi } from './auth/logonUserApi';
// import { boardMenuApi } from './board/boardMenuApi';

export const serviceApis = [
    logonUserApi,
    // boardMenuApi
];

export const rootServiceReducer = {
  [logonUserApi.reducerPath]: logonUserApi.reducer,
  // [boardMenuApi.reducerPath]: boardMenuApi.reducer,
};