import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { store } from '@/redux/store';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { auth } from '@/firebase/config';
import { setUser } from '@/redux/slices/authSlice';
import { useFonts } from 'expo-font';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MD3LightTheme, MD3DarkTheme, PaperProvider } from 'react-native-paper';

function RootLayoutNav() {
  const { user, loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const segments = useSegments();
  const router = useRouter();

  // Load vector icons font
  const [fontsLoaded] = useFonts({
    ...MaterialCommunityIcons.font,
  });

  // Listen to Firebase auth state changes and synchronize Redux store
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch(
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
          })
        );
      } else {
        dispatch(setUser(null));
      }
    });

    return unsubscribe;
  }, [dispatch]);

  // Reactive Route Guard / Protection
  useEffect(() => {
    // Wait until the Firebase Auth state has completed its initial check
    if (loading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!user && !inAuthGroup) {
      // User is not logged in and not in login/register screens: Redirect to login
      router.replace('/(auth)/login');
    } else if (user && inAuthGroup) {
      // User is logged in and on login/register screens: Redirect to dashboard
      router.replace('/(tabs)');
    }
  }, [user, segments, loading, router]);

  // Read theme selection from Redux state
  const { themeMode } = useAppSelector((state) => state.theme);

  // Custom themes using Material Design 3 guidelines
  const paperTheme = themeMode === 'dark'
    ? {
        ...MD3DarkTheme,
        colors: {
          ...MD3DarkTheme.colors,
          primary: '#007AFF',
          background: '#121212',
          surface: '#1E1E1E',
        }
      }
    : {
        ...MD3LightTheme,
        colors: {
          ...MD3LightTheme.colors,
          primary: '#007AFF',
          background: '#F8F9FA',
          surface: '#FFFFFF',
        }
      };

  const statusBarStyle = themeMode === 'dark' ? 'light' : 'dark';

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PaperProvider theme={paperTheme}>
      <StatusBar style={statusBarStyle} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="notes" />
      </Stack>
    </PaperProvider>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <RootLayoutNav />
      </SafeAreaProvider>
    </Provider>
  );
}
