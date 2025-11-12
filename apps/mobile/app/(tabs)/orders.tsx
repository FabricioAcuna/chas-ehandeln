import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";

// TODO: Replace with actual order data from API/backend
// This is ready for integration with order history API

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  total: number;
  status: "completed" | "pending" | "cancelled";
  items: Array<{ name: string; quantity: number; price: number }>;
}

// Mock data - ready for API integration
const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-2024-001",
    date: "2024-01-15",
    total: 1798,
    status: "completed",
    items: [{ name: "Chelsea Home Jersey 2024", quantity: 2, price: 899 }],
  },
  {
    id: "2",
    orderNumber: "ORD-2024-002",
    date: "2024-01-10",
    total: 899,
    status: "completed",
    items: [{ name: "Arsenal Home Jersey 2024", quantity: 1, price: 899 }],
  },
];

export default function OrdersScreen() {
  const router = useRouter();

  // TODO: Fetch orders from API
  // const { data: orders, isLoading } = useQuery<Order[]>({
  //   queryKey: ['orders'],
  //   queryFn: fetchOrders,
  // });

  const orders = mockOrders; // Remove when using API

  if (orders.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="receipt-outline" size={64} color={Colors.light.icon} />
        <Text style={styles.emptyText}>Inga ordrar ännu</Text>
        <TouchableOpacity
          style={styles.btnPrimary}
          onPress={() => router.push("/(tabs)/products")}
        >
          <Text style={styles.btnPrimaryText}>Shoppa nu</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Mina ordrar</Text>
      </View>

      <View style={styles.ordersList}>
        {orders.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <View>
                <Text style={styles.orderNumber}>{order.orderNumber}</Text>
                <Text style={styles.orderDate}>{order.date}</Text>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  order.status === "completed"
                    ? styles.statusCompleted
                    : order.status === "pending"
                      ? styles.statusPending
                      : styles.statusCancelled,
                ]}
              >
                <Text style={styles.statusText}>
                  {order.status === "completed"
                    ? "Levererad"
                    : order.status === "pending"
                      ? "Väntande"
                      : "Inställd"}
                </Text>
              </View>
            </View>

            <View style={styles.orderItems}>
              {order.items.map((item, index) => (
                <View key={index} style={styles.orderItem}>
                  <Text style={styles.orderItemName}>
                    {item.name} × {item.quantity}
                  </Text>
                  <Text style={styles.orderItemPrice}>
                    {item.price * item.quantity}:-
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.orderFooter}>
              <Text style={styles.orderTotal}>Total: {order.total}:-</Text>
              <TouchableOpacity
                style={styles.viewOrderButton}
                onPress={() => {
                  // TODO: Navigate to order detail screen
                  console.log("View order:", order.id);
                }}
              >
                <Text style={styles.viewOrderButtonText}>Visa detaljer</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    padding: 20,
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.light.text,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    backgroundColor: Colors.light.background,
  },
  emptyText: {
    fontSize: 18,
    color: Colors.light.icon,
    marginTop: 16,
    marginBottom: 24,
  },
  btnPrimary: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  btnPrimaryText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  ordersList: {
    padding: 20,
    gap: 16,
  },
  orderCard: {
    backgroundColor: Colors.light.cardBackground,
    borderRadius: 12,
    padding: 16,
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.light.text,
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 14,
    color: Colors.light.icon,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  statusCompleted: {
    backgroundColor: "#10b981",
  },
  statusPending: {
    backgroundColor: "#f59e0b",
  },
  statusCancelled: {
    backgroundColor: "#ef4444",
  },
  statusText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  orderItems: {
    marginBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  orderItemName: {
    fontSize: 14,
    color: Colors.light.text,
    flex: 1,
  },
  orderItemPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.text,
  },
  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
  },
  orderTotal: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.light.text,
  },
  viewOrderButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: Colors.light.primary,
  },
  viewOrderButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
});
