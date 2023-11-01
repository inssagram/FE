import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  member: Object;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  member: [],
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser(
      state,
      action: PayloadAction<{
        member: Object;
      }>
    ) {
      state.isLoggedIn = true;
      state.member = action.payload;
    },
    logoutUser(state) {
      state.isLoggedIn = false;
      state.member = [];
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
