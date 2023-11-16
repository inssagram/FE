import { createSlice } from "@reduxjs/toolkit";

export const registerSlice = createSlice({
  name: "registerSlice",
  initialState: {
    email: "",
    nickname: "",
    password: "",
    job: "",
  },
  reducers: {
    reduceEmail(state, email) {
      state.email = email.payload;
    },
    reduceNickname(state,nickname){
      state.nickname = nickname.payload
    },
    reducePassword(state, password) {
      state.password = password.payload;
    },
    reduceJob(state, job) {
      state.job, job.payload;
    },
  },
});

export default registerSlice.reducer;
export const { reduceEmail,reduceNickname, reducePassword, reduceJob } = registerSlice.actions;
