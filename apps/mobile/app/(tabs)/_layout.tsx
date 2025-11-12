import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.primary,
        tabBarInactiveTintColor: Colors.light.tabIconDefault,
        tabBarStyle: {
          backgroundColor: Colors.light.background,
          borderTopColor: Colors.light.border,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerStyle: {
          backgroundColor: Colors.light.background,
        },
        headerTintColor: Colors.light.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Hem',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: 'Produkter',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'shirt' : 'shirt-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'receipt' : 'receipt-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Korg',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'cart' : 'cart-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ProductDetail"
        options={{
          href: null, // Hide from tab bar
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="CheckoutScreen"
        options={{
          href: null, // Hide from tab bar
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="OrderConfirmationScreen"
        options={{
          href: null, // Hide from tab bar
          headerShown: true,
        }}
      />
    </Tabs>
  );
}
