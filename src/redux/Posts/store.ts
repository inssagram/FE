// store.ts
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from "redux-persist/lib/storage" //로컬
import postsReducer from './postSlice';
import userReducer from './userSlice';
import commentsReducer from './commentSlice';
import profileReducer from './userProfileSlice';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import emailState from '@/pages/signup/emailState';

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["profile"], //영속성 유지할 리듀서 이름
  // blacklist: 유지하지 않을 리듀서 이름
}

const reducers = combineReducers({
    user: userReducer,
    posts: postsReducer,
    comments: commentsReducer,
    profile: profileReducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: {
    persistedReducer,
    user: emailState
  },
  middleware: [thunk, logger],
});

const persistor = persistStore(store);

// 타입스크립트에서 사용할 RootState 타입 정의
export type RootState = ReturnType<typeof store.getState>;

export {store, persistor};

