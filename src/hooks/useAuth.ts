import { useAppSelector } from '@/redux/hooks';

export function useAuth() {
  const { user, loading, error } = useAppSelector((state) => state.auth);

  return {
    user,
    isAuthenticated: !!user,
    loading,
    error,
  };
}
