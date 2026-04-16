import { configureStore, combineReducers } from '@reduxjs/toolkit';
import rootSliceReducer from './features/rootSliceReducer';
import { rootServiceReducer, serviceApis } from './services/rootServiceReducer';

const appReducer = combineReducers({
    ...rootSliceReducer,
    ...rootServiceReducer
});

export const makeStore = () => {
  return configureStore({
    reducer: appReducer,
    // Adding the api middleware enables caching, invalidation, polling, and other RTK Query features.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            ...serviceApis.map((api) => api.middleware)
        ),
    });
};

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore['dispatch']