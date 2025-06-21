import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  user: null,
  accessToken: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      const  accessToken  = action.payload;
      state.accessToken = accessToken;
    },
    logout: (state) => {
      state.accessToken = null;
    },
  },
});

export const { setToken, logout } = authSlice.actions;

export default authSlice.reducer;