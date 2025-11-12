import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";

export default function OrderConfirmationScreen() {
  const router = useRouter();

  // TODO: Get order details from route params or context
  // const { orderNumber, total, items } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="checkmark-circle" size={80} color="#10b981" />
        </View>

        <Text style={styles.title}>Tack för din beställning!</Text>
        <Text style={styles.subtitle}>
          Din order har bekräftats och vi har skickat en bekräftelse till din
          e-post.
        </Text>

        {/* TODO: Display order details */}
        {/* <View style={styles.orderDetails}>
          <Text style={styles.orderNumber}>Ordernummer: {orderNumber}</Text>
          <Text style={styles.orderTotal}>Total: {total} kr</Text>
        </View> */}

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.btnPrimary}
            onPress={() => router.push("/(tabs)")}
          >
            <Text style={styles.btnPrimaryText}>Tillbaka till hem</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnSecondary}
            onPress={() => router.push("/(tabs)/orders")}
          >
            <Text style={styles.btnSecondaryText}>Visa mina ordrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    alignItems: "center",
    maxWidth: 400,
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
    color: Colors.light.text,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.icon,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  orderDetails: {
    width: "100%",
    backgroundColor: Colors.light.cardBackground,
    borderRadius: 12,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 8,
  },
  orderTotal: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.light.text,
  },
  actions: {
    width: "100%",
    gap: 12,
  },
  btnPrimary: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 6,
    alignItems: "center",
  },
  btnPrimaryText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  btnSecondary: {
    backgroundColor: "transparent",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 6,
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.light.primary,
  },
  btnSecondaryText: {
    color: Colors.light.primary,
    fontWeight: "600",
    fontSize: 16,
  },
});
