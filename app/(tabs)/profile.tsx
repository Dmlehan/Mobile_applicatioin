import React, { useState } from 'react';
import { StyleSheet, View, Alert, Platform, Switch } from 'react-native';
import { Button, Text, Surface, Avatar, ActivityIndicator, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setUser } from '@/redux/slices/authSlice';
import { toggleTheme } from '@/redux/slices/themeSlice';
import { authService } from '@/services/authService';
import { seedNotesForUser } from '@/utils/seeder';

export default function ProfileScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { user } = useAppSelector((state) => state.auth);
  const { themeMode } = useAppSelector((state) => state.theme);

  const [seeding, setSeeding] = useState(false);
  const [loading, setLoadingState] = useState(false);

  const isDarkMode = themeMode === 'dark';

  const handleLogout = async () => {
    setLoadingState(true);
    try {
      await authService.logout();
      dispatch(setUser(null));
      router.replace('/(auth)/login');
    } catch (err: any) {
      if (Platform.OS === 'web') {
        alert(err.message || 'Logout failed');
      } else {
        Alert.alert('Error', err.message || 'Logout failed');
      }
    } finally {
      setLoadingState(false);
    }
  };

  const handleSeedData = async () => {
    if (!user) return;
    setSeeding(true);
    try {
      await seedNotesForUser(user.uid);
      if (Platform.OS === 'web') {
        alert('Sample notes successfully seeded into your database! Refresh dashboard to see them.');
      } else {
        Alert.alert('Success', 'Sample notes successfully seeded!');
      }
      router.replace('/(tabs)');
    } catch (err: any) {
      if (Platform.OS === 'web') {
        alert(err.message || 'Failed to seed data');
      } else {
        Alert.alert('Error', err.message || 'Failed to seed data');
      }
    } finally {
      setSeeding(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Surface style={[styles.profileCard, { backgroundColor: theme.colors.elevation.level1 }]} elevation={2}>
        <Avatar.Icon size={80} icon="account" style={styles.avatar} />
        <Text style={[styles.title, { color: theme.colors.onSurface }]}>User Profile</Text>
        <Text style={[styles.email, { color: theme.colors.onSurfaceVariant }]}>{user?.email || 'Guest User'}</Text>

        <View style={[styles.themeRow, { borderBottomColor: theme.colors.outlineVariant }]}>
          <Text style={[styles.themeLabel, { color: theme.colors.onSurface }]}>Dark Mode</Text>
          <Switch
            value={isDarkMode}
            onValueChange={() => { dispatch(toggleTheme()); }}
            thumbColor={isDarkMode ? theme.colors.primary : '#CCCCCC'}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
          />
        </View>

        <View style={styles.buttonContainer}>
          {seeding ? (
            <ActivityIndicator style={styles.loader} size="small" color={theme.colors.primary} />
          ) : (
            <Button
              mode="contained"
              icon="database-plus"
              onPress={handleSeedData}
              style={styles.seedBtn}
            >
              Seed Sample Notes
            </Button>
          )}

          <Button
            mode="outlined"
            icon="logout"
            onPress={handleLogout}
            loading={loading}
            style={[styles.logoutBtn, { borderColor: theme.colors.error }]}
            textColor={theme.colors.error}
          >
            Sign Out
          </Button>
        </View>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profileCard: {
    width: '100%',
    maxWidth: 400,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: '#007AFF',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    marginBottom: 24,
  },
  themeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 12,
    borderBottomWidth: 1,
    marginBottom: 24,
  },
  themeLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  seedBtn: {
    borderRadius: 8,
    backgroundColor: '#007AFF',
  },
  logoutBtn: {
    borderRadius: 8,
  },
  loader: {
    marginVertical: 10,
  },
});
