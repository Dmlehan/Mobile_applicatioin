import React, { useState } from 'react';
import { StyleSheet, View, Alert, Platform } from 'react-native';
import { Button, Text, Surface, Avatar, ActivityIndicator } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setUser } from '@/redux/slices/authSlice';
import { authService } from '@/services/authService';
import { seedNotesForUser } from '@/utils/seeder';

export default function ProfileScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [seeding, setSeeding] = useState(false);
  const [loading, setLoadingState] = useState(false);

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
    <View style={styles.container}>
      <Surface style={styles.profileCard} elevation={2}>
        <Avatar.Icon size={80} icon="account" style={styles.avatar} />
        <Text style={styles.title}>User Profile</Text>
        <Text style={styles.email}>{user?.email || 'Guest User'}</Text>

        <View style={styles.buttonContainer}>
          {seeding ? (
            <ActivityIndicator style={styles.loader} size="small" color="#007AFF" />
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
            style={styles.logoutBtn}
            textColor="#E53935"
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
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  profileCard: {
    width: '100%',
    maxWidth: 400,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  avatar: {
    backgroundColor: '#007AFF',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 32,
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
    borderColor: '#E53935',
  },
  loader: {
    marginVertical: 10,
  },
});
