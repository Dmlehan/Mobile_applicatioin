import { Redirect } from 'expo-router';

export default function Index() {
  // Redirect to login screen by default in Phase 1
  return <Redirect href="/(auth)/login" />;
}
