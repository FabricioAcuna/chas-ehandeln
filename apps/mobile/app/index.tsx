import { Redirect } from "expo-router";

// Redirect to tabs/index to ensure bottom navigation is shown
export default function Index() {
  return <Redirect href="/(tabs)" />;
}
