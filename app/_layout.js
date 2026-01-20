import { Stack } from 'expo-router';

export default function Layout() {
  return <Stack
    screenOptions={{
      headerShown: false, // optional, hides default header
    }}
  />;
}
