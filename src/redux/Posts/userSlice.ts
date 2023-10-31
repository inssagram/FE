import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 현재 상태 타입 정의하기
interface UserState {
  id: string | null;
  email: string | null;
  nickname: string | null;
  companyName: string | null;
  profilePic: string | null;
  password: string | null;
  isLoggedIn: boolean;
}

// 초기 사용자 상태 정의
const initialState: UserState = {
  id: null,
  email: null,
  nickname: null,
  companyName: null,
  profilePic: null,
  password: null,
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ email: string; password: string }>) {
      state.isLoggedIn = true;
      state.email = action.payload.email;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.email = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
