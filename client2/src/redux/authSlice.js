import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  tokens: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      const { isAuthenticated, user, tokens } = action.payload;
      state.isAuthenticated = isAuthenticated;
      state.user = user;
      state.tokens = tokens;
    },

    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.tokens = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
