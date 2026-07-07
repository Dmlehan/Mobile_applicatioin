// Placeholder custom hook for authentication state and methods
export function useAuth() {
  const user = null;
  const isAuthenticated = false;
  const loading = false;

  const login = async () => {};
  const register = async () => {};
  const logout = async () => {};

  return {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
  };
}
