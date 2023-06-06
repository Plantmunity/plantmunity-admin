import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setCredentials: (state, { payload: { token } }) => {
      state.token = token;
    },
    resetCredentials: (state) => {
      state.token = null;
    },
  },
});

export const { setCredentials, resetCredentials } = authSlice.actions;

export default authSlice.reducer;
