import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  uid: string;
  email: string | null;
  displayName: string | null;
}

interface AuthState {
  user: UserState | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState | null>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      state.error = null;
    },
  },
});

export const { setUser, setLoading, setError, logoutUser } = authSlice.actions;
export default authSlice.reducer;
