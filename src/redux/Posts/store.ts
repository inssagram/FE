// store.ts
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postSlice';
import commentsReducer from './commentSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
  },
});

// 타입스크립트에서 사용할 RootState 타입 정의
export type RootState = ReturnType<typeof store.getState>;


