import { registerUser, loginUser, logoutUserFirebase } from '@/firebase/auth';
import { UserState } from '@/redux/slices/authSlice';

export const authService = {
  async register(email: string, password: string): Promise<UserState> {
    const user = await registerUser(email, password);
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    };
  },

  async login(email: string, password: string): Promise<UserState> {
    const user = await loginUser(email, password);
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    };
  },

  async logout(): Promise<void> {
    await logoutUserFirebase();
  },
};
