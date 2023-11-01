import { createSlice } from "@reduxjs/toolkit";

export const registerSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    password: "",
    job: "",
  },
  reducers: {
    reduceEmail(state, email) {
      state.email = email.payload;
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
export const { reduceEmail, reducePassword, reduceJob } = registerSlice.actions;
