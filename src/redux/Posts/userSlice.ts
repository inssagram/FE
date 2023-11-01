import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 현재 상태 타입 정의하기
interface UserState {
  member: Object;
  isLoggedIn: boolean;
}

// 초기 사용자 상태 정의
const initialState: UserState = {
  member: [],
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(
      state,
      action: PayloadAction<{
        member: Object;
      }>
    ) {
      console.log(action.payload);
      state.isLoggedIn = true;
      state.member = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.member = [];
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;