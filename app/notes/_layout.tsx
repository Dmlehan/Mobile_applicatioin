import { Stack } from 'expo-router';

export default function NotesLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="create" options={{ title: 'Create Note' }} />
      <Stack.Screen name="[id]" options={{ title: 'Note Details' }} />
      <Stack.Screen name="edit" options={{ title: 'Edit Note' }} />
    </Stack>
  );
}
