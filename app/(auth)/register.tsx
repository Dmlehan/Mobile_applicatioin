import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { TextInput, Button, Text, Surface, HelperText } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setUser, setLoading, setError } from '@/redux/slices/authSlice';
import { authService } from '@/services/authService';
import { isValidEmail } from '@/utils/validation';
import { getFriendlyErrorMessage } from '@/utils/firebaseErrors';

export default function RegisterScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: any) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const userState = await authService.register(data.email, data.password);
      dispatch(setUser(userState));
      router.replace('/(tabs)');
    } catch (err: any) {
      dispatch(setError(getFriendlyErrorMessage(err)));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <Surface style={styles.card} elevation={2}>
          <Text variant="headlineMedium" style={styles.title}>
            NoteSphere
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Create an account to get started
          </Text>

          {error && <Text style={styles.errorBanner}>{error}</Text>}

          <Controller
            control={control}
            name="email"
            rules={{
              required: 'Email is required',
              validate: (val) => isValidEmail(val) || 'Invalid email address',
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputWrapper}>
                <TextInput
                  label="Email"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  mode="outlined"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={!!errors.email}
                  disabled={loading}
                />
                {errors.email && (
                  <HelperText type="error" visible={!!errors.email}>
                    {errors.email.message}
                  </HelperText>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputWrapper}>
                <TextInput
                  label="Password"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  mode="outlined"
                  secureTextEntry
                  error={!!errors.password}
                  disabled={loading}
                />
                {errors.password && (
                  <HelperText type="error" visible={!!errors.password}>
                    {errors.password.message}
                  </HelperText>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: 'Confirm Password is required',
              validate: (val) => val === getValues('password') || 'Passwords do not match',
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputWrapper}>
                <TextInput
                  label="Confirm Password"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  mode="outlined"
                  secureTextEntry
                  error={!!errors.confirmPassword}
                  disabled={loading}
                />
                {errors.confirmPassword && (
                  <HelperText type="error" visible={!!errors.confirmPassword}>
                    {errors.confirmPassword.message}
                  </HelperText>
                )}
              </View>
            )}
          />

          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            loading={loading}
            disabled={loading}
            style={styles.button}
          >
            Register
          </Button>

          <View style={styles.footer}>
            <Text variant="bodyMedium">{"Already have an account? "}</Text>
            <Button
              compact
              mode="text"
              onPress={() => router.push('/(auth)/login')}
              disabled={loading}
            >
              Log In
            </Button>
          </View>
        </Surface>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    padding: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    color: '#666666',
    marginBottom: 24,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    paddingVertical: 4,
    backgroundColor: '#007AFF',
  },
  errorBanner: {
    color: '#FF3B30',
    backgroundColor: '#FFE5E5',
    padding: 10,
    borderRadius: 8,
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});
