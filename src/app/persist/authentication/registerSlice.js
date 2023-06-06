import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
};

export const registerSlice = createSlice({
  name: "register",
  initialState,

  reducers: {
    setEmailVerification: (state, { payload: { email } }) => {
      state.email = email;
    },
    resetEmail: (state) => {
      state.email = null;
    },
  },
});

export const { setEmailVerification, resetEmail } = registerSlice.actions;

export default registerSlice.reducer;
