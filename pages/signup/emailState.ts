import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: {
    email: "",
    password: "",
    nickname: "",
    companyName: "",
  },
  reducers: {
    reduceEmail(state, email){
     state.email = email.payload   
    },
    reducePassword(state, password){
        state.password = password.payload
    },
    reduceNickname(state, nickname){
        state.nickname = nickname.payload
    },
    reduceCompanyName(state, companyName){
        state.companyName, companyName.payload
    }
  },
});

export default user.reducer;
export const {reduceEmail, reducePassword, reduceNickname, reduceCompanyName} = user.actions;
