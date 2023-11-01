import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  dataStates: any;
}

const initialState: AuthState = {
  dataStates: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setDataStates: (state, action) => {
      state.dataStates = action.payload;
    },
  },
});

export const { setDataStates } = dataSlice.actions;

export default dataSlice.reducer;
