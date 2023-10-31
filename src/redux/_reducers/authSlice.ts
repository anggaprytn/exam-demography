import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isSignedIn: boolean;
  data: any;
}

const initialState: AuthState = {
  isSignedIn: false,
  data: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthTokens: state => {
      state.isSignedIn = true;
    },
    clearTokens: state => {
      state.isSignedIn = false;
      state.data = null;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setAuthTokens, clearTokens, setData } = authSlice.actions;

export default authSlice.reducer;
