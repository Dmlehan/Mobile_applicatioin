import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>NoteSphere Login</Text>
      <Link href="/(auth)/register" style={styles.link}>
        <Text>Go to Register</Text>
      </Link>
      <Link href="/(tabs)" style={styles.link}>
        <Text>Bypass to Notes (Tabs)</Text>
      </Link>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  link: {
    marginTop: 15,
    color: '#007AFF',
  },
});
