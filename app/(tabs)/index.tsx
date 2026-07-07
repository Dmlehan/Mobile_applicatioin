import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notes Dashboard</Text>
      
      <Link href="/notes/create" style={styles.link}>
        <Text>+ Create New Note</Text>
      </Link>
      
      <Link href="/notes/example-id" style={styles.link}>
        <Text>View Note details (example-id)</Text>
      </Link>

      <Link href="/(auth)/login" style={styles.link}>
        <Text>Logout</Text>
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
    fontSize: 16,
  },
});
