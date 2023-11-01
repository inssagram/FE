import thunk from "redux-thunk";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";
import { registerSlice } from "@/pages/signup/emailState";
import profileReducer from "./userProfileSlice";
// import postsReducer from "./postSlice";
// import commentsReducer from "./commentSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["profile"],
};

const reducers = combineReducers({
  user: userSlice.reducer,
  register: registerSlice.reducer,
  profile: profileReducer,
  // posts: postsReducer,
  // comments: commentsReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, logger],
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export { store, persistor };
