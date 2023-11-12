import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Member {
  email: string;
  member_id: number;
  nickname: string;
  job: string;
  image: string;
}

interface UserState {
  member: Member | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  member: null,
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser(state, action: PayloadAction<Member>) {
      state.isLoggedIn = true;
      state.member = action.payload;
    },
    logoutUser(state) {
      state.isLoggedIn = false;
      state.member = null;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
