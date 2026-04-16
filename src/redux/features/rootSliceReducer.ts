
// // // 개별 reducer
// // // import { counterSlice } from "./features/counter/counterSlice";
// // // import { quotesApiSlice } from "./features/quotes/quotesApiSlice";

// // // 1. 개별 reducer 합치기
// // const rootReducer = combineSlices(counterSlice, quotesApiSlice);
// // export type RootState = ReturnType<typeof rootReducer>;


// // // export const store = configureStore({
// // //     reducer: {
// // //       auth: authReducer,
// // //       ui: uiReducer,
// // //     },
// // //     devTools: process.env.NODE_ENV !== 'production',
// // // });
// // ================================================
// import { combineReducers } from '@reduxjs/toolkit';
// // import rootUserReducer from './user';
// import boardMenuReducer from './board/menuSlice';

// export const rootSliceReducer = combineReducers({
// //   user: rootUserReducer,
//   boardMenu: boardMenuReducer,
// });
// export default rootSliceReducer;
// ================================================
import boardMenuReducer from './board/menuSlice';

export const rootSliceReducer = {
  // user: rootUserReducer,
  boardMenu: boardMenuReducer,
};
export default rootSliceReducer;