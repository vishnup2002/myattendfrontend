import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: "",
  },
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },

    logout: (state) => {
      state.isLoggedIn = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    delUser: (state) => {
      state.user = "";
    },
  },
});

export const { login, logout, setUser, delUser } = authSlice.actions;

export default authSlice.reducer;
