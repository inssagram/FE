import thunk from "redux-thunk";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";
import { registerSlice } from "@/pages/signup/emailState";
import profileReducer from "./userProfileSlice";
import { postsSlice } from "./postSlice";
import { commentsSlice } from "./commentSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["profile", "user"],
};

const reducers = combineReducers({
  user: userSlice.reducer,
  register: registerSlice.reducer,
  profile: profileReducer,
  posts: postsSlice.reducer,
  comments: commentsSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, logger],
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export { store, persistor };
